import usersJson from "../data/users.json";
import projectsJson from "../data/my-projects.json";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = "myTokenSecret";

export const login = (email, password) => {
  try {
    const user = usersJson.find((user) => user.email === email);
    if (!user) throw new Error("400");

    const dosePasswordMatch = bcrypt.compare(user.password, password);
    if (!dosePasswordMatch) throw new Error("400");

    return {
      userName: user.username,
      userId: user.id,
      token: jwt.sign(
        {
          id: user.id,
        },
        jwtSecret,
        {
          expiresIn: "1h",
        }
      ),
    };
  } catch (err) {
    if (err.message === "400")
      throw new Error("Status: 400, Message: bad request");
    else throw new Error("Status: 500, Message: internal server error");
  }
};

export const getProjectsFromDb = (token) => {
  try {
    try {
      jwt.verify(token, jwtSecret);
    } catch {
      throw new Error("401");
    }

    const userId = jwt.decode(token).id;

    return projectsJson.filter((project) => project.userId === userId);
  } catch (err) {
    if (err.message === "401")
      throw new Error("Status: 401, Message: unauthorized error");
    else throw new Error("Status: 500, Message: internal server error");
  }
};
