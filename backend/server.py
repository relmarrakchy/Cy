from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pickle

with open("./pickels/label_encoder_cyber_f.pkl", "rb") as file:
    cyber_encoders = pickle.load(file)

with open("./pickels/label_encoder_cyber_y.pkl", "rb") as file:
    cyber_pre_encoder = pickle.load(file)

with open("./pickels/model_cyber.pkl", "rb") as file:
    cyber_model = pickle.load(file)


##with open("./pickels/scaler_pish.pkl", "rb") as file:
    ##scaler = pickle.load(file)

##with open("./pickels/model_phish.pkl", "rb") as file:
    ##phish_model = pickle.load(file)

app = Flask(__name__)
CORS(app)

@app.route('/phishing', methods=['POST'])
def analyze():
    user_data = request.get_json()
    url = user_data['url']

    return jsonify({
        "threat": url
    }), 201

@app.route('/detect_threat', methods=['POST'])
def sendResponse():
    user_input = request.json
    protocol = user_input.get("protocol")
    flag = user_input.get("flag")
    packet = user_input.get("packet")
    senderID = int(user_input.get("senderID"))
    ipSource = user_input.get("ipSource")
    portSource = int(user_input.get("portSource"))
    packetSize = int(user_input.get('packetSize'))

    featuers = [protocol, flag, packet, senderID, ipSource, portSource, packetSize]
    encoded_data = np.array([])

    for value, encoder in zip(featuers, cyber_encoders):
        encoded_value = encoder.transform([value])[0]
        encoded_data.resize(encoded_data.size + 1)
        encoded_data[-1] = encoded_value

    encoded_data = encoded_data.reshape(1, -1)
    predictions_encoded = cyber_model.predict(encoded_data)
    prediction = cyber_pre_encoder.inverse_transform(predictions_encoded)

    res = prediction[0]

    return jsonify({
        "threat": res
    }), 201


if __name__ == "__main__":
    app.run(debug=True, port=4001)