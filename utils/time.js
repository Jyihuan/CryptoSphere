import moment from "moment";

const getRecent10Days = () => {
  const dates = [];
  for (let i = 0; i < 10; i++) {
    const date = moment().subtract(i, "days").format("YYYY-MM-DD");
    dates.push(date);
  }
  return dates;
};

const getNext5Days = () => {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    const date = moment().add(i, "days").format("YYYY-MM-DD");
    dates.push(date);
  }
  return dates;
};

export { getRecent10Days, getNext5Days };
