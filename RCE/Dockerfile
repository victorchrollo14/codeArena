FROM docker:27.3.1-cli-alpine3.20

RUN apk add --update --no-cache python3 py3-pip
WORKDIR /app

COPY ./requirements.txt .
RUN pip3 install -r requirements.txt --break-system-packages 

CMD ["python3", "-u", "main.py"]
