from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Frontend se connect hone ke liye

# Temporary storage for scores
scores = []

@app.route("/score", methods=["POST"])
def save_score():
    data = request.json 
    player = data.get("player")
    moves = data.get("moves")

    if not player or moves is None:
        return jsonify({"message": "Invalid data!"}), 400

    # Store the score
    scores.append({"player": player, "moves": moves})
    print(f"Score saved: {player} -> {moves} moves")

    return jsonify({"message": "Score saved!", "scores": scores})

@app.route("/scores", methods=["GET"])
def get_scores():
    # Return all scores (could be used for leaderboard)
    return jsonify(scores)

if __name__ == "__main__":
    app.run(debug=True)
