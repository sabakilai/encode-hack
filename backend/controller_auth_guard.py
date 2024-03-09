from flask import request, jsonify
from functools import wraps
import os

def controller_auth_guard(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        print(token)

        if not token or token != os.getenv('AUTHENTICATION_TOKEN'):
            return jsonify({'message': 'Unauthorized'}), 401

        return f(*args, **kwargs)

    return decorated