FROM python:latest
WORKDIR /users-api
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python3", "index.py"]