# app.py

from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from config import Config
from flask_cors import CORS
from sklearn.neighbors import KNeighborsClassifier
import os


# Initialize Flask app and load configuration
app = Flask(__name__)
app.config.from_object(Config)

# Initialize PyMongo with Flask
mongo = PyMongo(app)

collection = mongo.db.chapterSchoolCollection
MONGO_DATA= list(collection.find())
CORS(app)


# Default route
@app.route('/')
def home():
    welcome_string = """
    Welcome to the Pi Kappa Phi Chapter Data API.
    This API connects front end users to MONGO DB
    Supported routes include '/runKnn' and '/chapterData' 
    """
    return welcome_string

# Route to add a new document to a MongoDB collection
@app.route('/add', methods=['POST'])
def add_document():
    data = request.get_json()  # Get the data from the request body (in JSON format)
    
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Insert the document into MongoDB (assuming collection name 'items')
    collection = mongo.db.items
    result = collection.insert_one(data)
    
    return jsonify({"message": "Document added", "id": str(result.inserted_id)}), 201



@app.route('/chapterData')
def get_chapter_data():

    items = []
    if MONGO_DATA is None:
        MONGO_DATA = list(collection.find())
    for item in MONGO_DATA:
        item['_id'] = str(item['_id'])
        items.append(item)
    return jsonify(items), 200


# Route to get all documents from the MongoDB collection
@app.route('/items', methods=['GET'])
def get_items():
    collection = mongo.db.items
    items = list(collection.find())  # Find all documents
    
    # Convert MongoDB ObjectId to string for JSON compatibility
    for item in items:
        item['_id'] = str(item['_id'])
    
    return jsonify(items), 200

@app.route("/runKnn")
def runKnn():
    fraternities = request.args.get("fraternities", None)
    enrollment = request.args.get("enrollment", None)

    fraternities = int(fraternities)
    enrollment = int(enrollment)

    if enrollment > 1000:
        enrollment = scale_enrollment(enrollment)

    x_data, y_data, labels = create_knn_vectors_mongo_data()

    predictions, neighbors = execute_knn_algorithm(x_data, y_data, enrollment, fraternities, labels, k=5)
    print(neighbors)

    distances = neighbors[0]
    indices = neighbors[1][0]
    k_nearest_neighbors = []

    for i in indices:
        close_neighbor = MONGO_DATA[i]
        close_neighbor["_id"] = str(close_neighbor["_id"])
        k_nearest_neighbors.append(close_neighbor)

    return {"prediction": str(predictions[0]), "distances": distances.tolist(), "nearest_schools": k_nearest_neighbors}, 200


def create_knn_vectors_mongo_data():
    # x is enrollment
    x = [] 
    # y is num fraternities
    y = []

    label = []


    for record in MONGO_DATA:
        print(record)
        enrollment = record["Undergrad Enrollment"]
        fraternities = record["Fraternities"]
        model = record["Model"]

        if enrollment > 1000:
            enrollment = scale_enrollment(enrollment)

        x.append(enrollment)
        y.append(fraternities)
        label.append(model)

    return x , y , label

def execute_knn_algorithm(x, y, new_x, new_y, labels, k=5):


    data = list(zip(x, y))
    knn = KNeighborsClassifier(n_neighbors=k, weights='distance', algorithm = 'brute')

    knn.fit(data, labels)

    if new_x > 1000:
        new_x = scale_enrollment(new_x)
    new_point = [(new_x, new_y)]

    # prediction is the class of the new point
    prediction = knn.predict(new_point)

    # neighbors is a matrix containing. First array is the distances, 2nd array is the indices of the points in order of their distance to the new point
    NEIGHBORS = knn.kneighbors(new_point, n_neighbors=k, return_distance=True)
    return prediction, NEIGHBORS

def scale_enrollment(enrollment):
    return enrollment/1000 * 1.0



# Run the Flask app
if __name__ == '__main__':
    env_host = os.getenv("FLASK_RUN_HOST")
    app.run(debug=False, host=env_host)
