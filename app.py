from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/score", methods=["POST"])
def score():
    data = request.json
    print("Moves:", data["moves"])
    print("Time:", data["time"])
    return jsonify({"status": "saved"})

if __name__ == "__main__":
    app.run(debug=True)
