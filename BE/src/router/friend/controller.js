const queryGenerator = require('../../middleware/connector');

const addFriend = async (req, res) => {
  try {
    const { addFrom, addTo } = req.body;
    const query = {
      str: `INSERT INTO friend VALUES ($1, $2)`,
      val: [addFrom, addTo],
    };

    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { addFrom, addTo } = req.body;
    const query = {
      str: `DELETE FROM friend WHERE add_from = $1 AND add_to = $2`,
      val: [addFrom, addTo],
    };
    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getIadd = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT add_to FROM friend AS S WHERE add_from = $1 AND NOT EXISTS (SELECT add_from FROM friend WHERE add_to = $1 AND add_from = S.add_to) `,
      val: [id],
    };
    const queryResult = await queryGenerator(query.str, query.val);
    res.json(queryResult);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getAddMe = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT add_from FROM friend AS S WHERE add_to = $1 AND NOT EXISTS (SELECT add_to FROM friend WHERE add_from = $1 AND add_to = S.add_from) `,
      val: [id],
    };
    const queryResult = await queryGenerator(query.str, query.val);
    res.json(queryResult);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getAddBoth = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT add_from FROM friend AS S WHERE add_to = $1 AND EXISTS (SELECT add_to FROM friend WHERE add_from = $1 AND add_to = S.add_from) `,
      val: [id],
    };
    const queryResult = await queryGenerator(query.str, query.val);
    res.json(queryResult);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  addFriend,
  deleteFriend,
  getIadd,
  getAddMe,
  getAddBoth,
};
