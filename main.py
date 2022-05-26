from app import app, mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from flask_cors import CORS, cross_origin

@app.route('/museums')
@cross_origin(supports_credentials=True)
def museums():
	museums = mongo.db.museums.find()
	resp = dumps(museums)
	return resp
		
@app.route('/museums/<id>')
@cross_origin(supports_credentials=True)
def museum(id):
	museum = mongo.db.museums.find_one({'_id': ObjectId(id)})
	resp = dumps(museum)
	return resp
		
@app.errorhandler(404)
@cross_origin(supports_credentials=True)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Nie znaleziono: ' + request.url,
    }
    resp = jsonify(message)
    resp.status_code = 404

    return resp

if __name__ == "__main__":
    app.run(port=8082)