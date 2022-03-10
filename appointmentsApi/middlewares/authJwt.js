import jwt from "jsonwebtoken";

export async function decodeToken(token) {
  const user = jwt.decode(token, process.env["JWT"]);
  return user;
}

export async function isAdmin(req, res) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({
        message: "TokenError: no token provided",
      });
    }

    const user = decodeToken(token);

    if (user.user_type == 1) {
      return res.status(403).json({
        message: "You're not allowed to do that",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error checking admin permission",
      error: error.message,
    });
  }
}

export async function belongsToUser(req, res) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(400).json({
        message: "TokenError: no token provided",
      });
    }

    const user = decodeToken(token);

    const owner_id = req.params;
    if (user.document_id != owner_id) {
      return res.status(403).json({
        message: "You're not allowed to do that",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      message: "Error checking permission",
      error: error.message,
    });
  }
}
