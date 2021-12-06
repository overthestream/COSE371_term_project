const queryGenerator = require('../../middleware/connector');

const addList = async (req, res) => {
  try {
    const { listName } = req.body;
    const query = {
      str: `INSERT INTO list VALUES (DEFAULT, $1)`,
      val: [listName],
    };
    await queryGenerator(query.str, query.val);
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
  addList,
  putList,
  deleteList,
};
