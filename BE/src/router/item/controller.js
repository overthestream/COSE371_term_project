const queryGenerator = require('../../middleware/connector');

const addReq = async (req, res) => {
  try {
    const { itemTitle, itemDetail, listId, reqId } = req.body;

    const nextIdJSON = await queryGenerator(
      `SELECT nextval(pg_get_serial_sequence('item', 'item_id'))`
    );

    const nextId = parseInt(nextIdJSON[0].nextval, 10) + 1;
    const itemQuery = {
      str: `INSERT INTO item VALUES (DEFAULT, $1, $2, false, false, null)`,
      val: [itemTitle, itemDetail],
    };
    await queryGenerator(itemQuery.str, itemQuery.val);

    const ownQuery = {
      str: `INSERT INTO own_item VALUES ($1, $2)`,
      val: [listId, nextId],
    };
    await queryGenerator(ownQuery.str, ownQuery.val);

    const reqQuery = {
      str: `INSERT INTO prereq VALUES ($1, $2)`,
      val: [reqId, nextId],
    };
    await queryGenerator(reqQuery.str, reqQuery.val);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getReq = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT * from own_item, item, prereq WHERE own_item.list_id = $1 
      AND own_item.item_id = item.item_id AND prereq_id = item.item_id`,
      val: [id],
    };
    const result = await queryGenerator(query.str, query.val);
    res.json(result);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getCount = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT count(item.item_id) FROM list, own_item, item 
        WHERE list.list_id = own_item.list_id
        AND own_item.item_id = item.item_id AND list.list_id = $1`,
      val: [id],
    };
    const queryResult = await queryGenerator(query.str, query.val);
    res.send(queryResult[0].count);
    res.status(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `SELECT * FROM list natural join own_item natural join item WHERE list_id = $1 
      ORDER BY is_done ASC, is_important DESC, due_date ASC`,
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

const addItem = async (req, res) => {
  try {
    const { itemTitle, itemDetail, listId } = req.body;

    const nextIdJSON = await queryGenerator(
      `SELECT nextval(pg_get_serial_sequence('item', 'item_id'))`
    );

    const nextId = parseInt(nextIdJSON[0].nextval, 10) + 1;
    const itemQuery = {
      str: `INSERT INTO item VALUES (DEFAULT, $1, $2, false, false, null)`,
      val: [itemTitle, itemDetail],
    };
    await queryGenerator(itemQuery.str, itemQuery.val);

    const ownQuery = {
      str: `INSERT INTO own_item VALUES ($1, $2)`,
      val: [listId, nextId],
    };
    await queryGenerator(ownQuery.str, ownQuery.val);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const query = {
      str: `DELETE FROM item WHERE item_id = $1`,
      val: [id],
    };
    await queryGenerator(query.str, query.val);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const pinItem = async (req, res) => {
  try {
    const { id } = req.body;
    const query = {
      str: `UPDATE item SET is_important = not (SELECT is_important FROM item WHERE item_id = $1) WHERE item_id = $1`,
      val: [id],
    };

    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const doneItem = async (req, res) => {
  try {
    const { id } = req.body;
    const query = {
      str: `UPDATE item SET is_done = not (SELECT is_done FROM item WHERE item_id = $1) WHERE item_id = $1`,
      val: [id],
    };

    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const putTitle = async (req, res) => {
  try {
    const { newTitle, id } = req.body;
    const query = {
      str: `UPDATE item SET item_title = $1 WHERE item_id = $2`,
      val: [newTitle, id],
    };

    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
const putDetail = async (req, res) => {
  try {
    const { newDetail, id } = req.body;
    const query = {
      str: `UPDATE item SET item_detail = $1 WHERE item_id = $2`,
      val: [newDetail, id],
    };

    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

const putDue = async (req, res) => {
  try {
    const { dueDate, id } = req.body;
    const query = {
      str: `UPDATE item SET due_date = $1 WHERE item_id = $2`,
      val: [dueDate, id],
    };

    await queryGenerator(query.str, query.val);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getReq,
  addReq,
  getCount,
  getItem,
  addItem,
  deleteItem,
  pinItem,
  doneItem,
  putTitle,
  putDetail,
  putDue,
};
