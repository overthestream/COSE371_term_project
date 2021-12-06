const queryGenerator = require('../../middleware/connector');

const getList = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT list_id, list_name FROM user_table natural join own_list natural join list WHERE user_id = $1`,
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

const addList = async (req, res) => {
  try {
    const { listName, userId } = req.body;

    const nextIdJSON = await queryGenerator(
      `SELECT nextval(pg_get_serial_sequence('list', 'list_id'))`
    );

    const nextId = parseInt(nextIdJSON[0].nextval, 10) + 1;
    const listQuery = {
      str: `INSERT INTO list VALUES (DEFAULT, $1)`,
      val: [listName],
    };
    await queryGenerator(listQuery.str, listQuery.val);

    const ownQuery = {
      str: `INSERT INTO own_list VALUES ($1, $2)`,
      val: [userId, nextId],
    };
    await queryGenerator(ownQuery.str, ownQuery.val);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const putList = async (req, res) => {
  try {
    const { newName, id } = req.body;
    const query = {
      str: `UPDATE list SET list_name = $1 WHERE list_id = $2`,
      val: [newName, id],
    };
    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteList = async (req, res) => {
  try {
    const { id } = req.body;
    const query = {
      str: `DELETE FROM list WHERE list_id = $1`,
      val: [id],
    };
    await queryGenerator(query.str, query.val);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getList,
  addList,
  putList,
  deleteList,
};
