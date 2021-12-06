const queryGenerator = require('../../middleware/connector');

const registerUser = async (req, res) => {
  try {
    const { userId, userPw } = req.body;
    const query = {
      str: `INSERT INTO user_table VALUES ($1, $2)`,
      val: [userId, userPw],
    };

    const queryResult = await queryGenerator(query.str, query.val);
    res.status(200);
    res.json(queryResult);
  } catch (err) {
    console.log(err);
    res.send(err);
    res.status(500);
  }
};

const loginUser = async (req, res) => {
  try {
    const { userId, userPw } = req.body;
    const query = {
      str: `SELECT user_pw FROM user_table WHERE user_id = $1`,
      val: [userId],
    };
    const queryResult = await queryGenerator(query.str, query.val);
    if (queryResult.length) {
      if (queryResult[0].user_pw === userPw) res.send('success');
      else res.send('uncorrect');
    } else res.send('none');
  } catch (err) {
    console.log(err);
    res.send(err);
    res.status(500);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
