import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import { getRecent10Days, getNext5Days } from "../utils/time";
import Chart from "../components/Chart";
import { useSelector, useDispatch } from "react-redux";
import { addHoding, removeHoding } from "../store/reducer/holdingReducer";

import { Icon, MD3Colors } from "react-native-paper";
import { PREDICTED } from "../services/crypto";

function History() {
  const diapatch = useDispatch();

  const route = useRoute();
  const { current } = route.params;

  const holdings = useSelector((state) => state.holderReducer.holdings);

  const [time, setTime] = useState();
  const [isStar, setIsStar] = useState(false);
  const [chartData, setChartData] = useState();

  const [predictChartData, setPredictChartData] = useState([]);

  const generateChartData = () => {
    // console.log(current.last_10_days_prices, "-sss");
    // console.log(recent10Days);

    const recent10Days = getRecent10Days();
    const result = current.last_10_days_prices.map((last, idx) => {
      return { price: last, date: recent10Days[idx] };
    });
    setChartData(result);
  };

  const getIsStar = () => {
    const _ = holdings.map((item) => item.symbol);
    if (_.includes(current.symbol)) {
      return setIsStar(true);
    }
    return setIsStar(false);
  };

  const handleFavoriteOrUnfavorite = () => {
    if (!isStar) {
      return diapatch(addHoding({ symbol: current.symbol }));
    }
    return diapatch(removeHoding({ symbol: current.symbol }));
  };

  const onPredicted = async () => {
    const { current } = route.params;

    const res = await PREDICTED(current);

    const next5Days = getNext5Days();

    console.log(next5Days, res);
    const result = res.map((next, idx) => {
      return { price: next, date: next5Days[idx] };
    });
    setPredictChartData(result);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    generateChartData();

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    getIsStar();
  }, [holdings]);
  return (
    <View style={styles.root}>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.topic}>{current.symbol}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>

        <TouchableOpacity onPress={handleFavoriteOrUnfavorite}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Icon source="star" color={isStar ? "#4A8DFF" : MD3Colors.neutral} size={24} />
            <Text>{isStar ? "Unfavorite" : "Favorite"}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.chartbox}>
        <Text>last_10_days_prices</Text>
        <View style={{ marginTop: 5 }}>
          <Chart chartData={chartData}></Chart>
        </View>
      </View>

      <View>
        <Button onPress={onPredicted} title="predicted_prices"></Button>
        {predictChartData.length ? (
          <View style={styles.chartbox}>
            <Text>next_5_days_prices</Text>
            <View style={{ marginTop: 5 }}>
              <Chart chartData={predictChartData}></Chart>
            </View>
          </View>
        ) : (
          <Text></Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  topic: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
  },
  time: {
    marginLeft: 10,
    fontSize: 10,
  },
  chartbox: {
    marginTop: 10,
  },
});

export default History;
