from app import app, mongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from flask_cors import CORS, cross_origin

@app.route('/events')
@cross_origin(supports_credentials=True)
def events():
	events = mongo.db.events.find()
	resp = dumps(events)
	return resp
		
@app.route('/events/<id>')
@cross_origin(supports_credentials=True)
def event(id):
	event = mongo.db.events.find_one({'_id': ObjectId(id)})
	resp = dumps(event)
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
    app.run(port=8083)