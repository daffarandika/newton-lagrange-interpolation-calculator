from flask import Flask, request
from api import api
from routes import ns

app = Flask(__name__)
api.init_app(app)
api.add_namespace(ns)


if __name__ == '__main__':
    app.run(debug=True)
