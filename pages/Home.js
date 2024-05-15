import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { saveCryptoList } from "../store/reducer/holdingReducer";
import { coins as mock } from "../mock/index";
import { CRYPTO_LIST } from "../services/crypto";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

function HomePage(props) {
  const { navigation } = props;

  const dispatch = useDispatch();

  const cryptoList = useSelector((state) => state.holderReducer.cryptoList);

  // const [coins, setCoins] = useState([...mock]);

  const nav2HistoryPage = (current) => {
    navigation.navigate("Detail", { current });
  };

  const queryCryptoList = async () => {
    const res = await CRYPTO_LIST();
    if (res.length > 0) {
      dispatch(saveCryptoList(res));
    }
    // "price": 36.42, "symbol": "IBIT
  };

  // 生命周期函数
  useEffect(() => {
    const interval = setInterval(() => {
      queryCryptoList();
    }, 1000 * 10);
    return () => {
      clearInterval(interval);
    };
  }, []);

  if (cryptoList.length > 0)
    return (
      <ScrollView style={{ padding: 10 }}>
        {cryptoList.map((item, idx) => {
          return (
            <TouchableOpacity key={idx} style={styles.item} onPress={() => nav2HistoryPage(item)}>
              <View style={styles.left}>
                <View style={styles.icon}></View>
                <View style={styles.basicInfo}>
                  <Text style={styles.symbol}>{item.symbol}</Text>
                  <View style={styles.desc}>
                    <Text style={styles.price}>${item.price}</Text>
                  </View>
                </View>
              </View>

              {/* <Button style={styles.btn} onPress={() => nav2HistoryPage(item)} title=" view history"></Button> */}
              <Text style={[styles.rate, item.performance > 0 ? styles.green : styles.red]}>{item.performance.toFixed(2)}%</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} color={MD2Colors.blueA700} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  item: {
    fontSize: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 4, // 边框圆角半径
    marginBottom: 10,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    backgroundColor: "black",
  },
  basicInfo: {
    marginLeft: 10,
  },
  symbol: {
    fontWeight: "bold",
  },
  price: {
    color: "#999",
  },
  desc: {
    flexDirection: "row",
  },
  rate: {
    marginLeft: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: "#fff",
  },
  red: {
    // color: "red",
    backgroundColor: "red",
  },
  green: {
    // color: "green",
    backgroundColor: "green",
  },
  btn: {
    backgroundColor: "blue",
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
    fontSize: 5,
    width: 100,
  },
});

export default HomePage;
