const Mock = require("mockjs");

const { Random, mock } = Mock;

module.exports = () => {
  const data = {
    comments: [],
  };

  for (let i = 0; i < 10; i++) {
    data.comments.push({
      id: i,
      name: Random.cname(),
      desc: Random.cparagraph(),
      mock: JSON.stringify(mock.toString()),
    });
  }

  return data;
};
