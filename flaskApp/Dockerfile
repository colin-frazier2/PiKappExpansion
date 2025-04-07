FROM python:3.10.12

WORKDIR /flaskApp
COPY . /flaskApp

RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 5000

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV MONGO_USER="root"
ENV MONGO_PASS="example"
ENV MONGO_ENDPOINT="0.0.0.0:27017"

CMD ["python3", "app.py"]
