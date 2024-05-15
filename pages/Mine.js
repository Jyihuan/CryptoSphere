import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addHoding, removeAll, removeHoding } from "../store/reducer/holdingReducer";
import { Button } from "react-native-paper";

import { Dialog, Portal } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MinePage(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const holdings = useSelector((state) => state.holderReducer.holdings);
  const cryptoList = useSelector((state) => state.holderReducer.cryptoList);
  const userInfo = useSelector((state) => state.userReducer.userInfo);

  const [hodingsDaynamic, setHodingsDaynamic] = useState([]);

  const [visible, setVisible] = React.useState(false);

  const clearAllHodings = () => {
    dispatch(removeAll());
    setVisible(false);
  };

  const refreshHodings = () => {
    const symbols = holdings.map((h) => h.symbol);
    const _ = cryptoList.filter((item) => symbols.includes(item.symbol));
    // console.log(_);
    setHodingsDaynamic(_);
  };

  const remove = (current) => {
    // const symbol = current.symbol;
    // console.log(holdings, "--全局收藏列表");
    // console.log("即将要删除的那一项", symbol);
    dispatch(removeHoding(current));
  };

  const onLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace("Login");
  };

  useEffect(() => {
    refreshHodings();
    console.log(userInfo, "---minepage");
  }, [holdings]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.avatar}>
        <View style={styles.imgbox}></View>
        <View style={styles.nickname}>
          <Text>UserName: {userInfo.username}</Text>
        </View>
        <View>
          <Text>Email: {userInfo.email}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.header}>
          <Text>My Holdings({holdings.length})</Text>

          <Button icon="delete" buttonColor="" mode="text" onPress={() => setVisible(true)}>
            Clear All
          </Button>
        </View>

        <View style={styles.holdingsbox}>
          {hodingsDaynamic.map((h, idx) => {
            return (
              <View key={idx} style={styles.item} onPress={() => nav2HistoryPage(h)}>
                <View style={styles.left}>
                  <View style={styles.basicInfo}>
                    <Text style={styles.symbol}>{h.symbol}</Text>
                    <View style={styles.desc}>
                      <Text style={styles.price}>${h.price}</Text>
                      <Text style={[styles.rate, h.performance > 0 ? styles.green : styles.red]}>{h.performance.toFixed(2)}%</Text>
                    </View>
                  </View>
                </View>
                <Button onPress={() => remove(h)}>Delete</Button>
              </View>
            );
          })}
        </View>

        <Button style={{ marginTop: 10 }} mode="outlined" onPress={onLogout}>
          Logout
        </Button>
      </View>

      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <Dialog.Title>Warning</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Are you sure?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setVisible(false)}>Cancel</Button>
          <Button onPress={clearAllHodings}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: 200,
    backgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center",
  },
  imgbox: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "white",
  },
  nickname: {
    marginTop: 20,
  },
  container: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  holdingsbox: {
    marginTop: 10,
    backgroundColor: "#fff",
    padding: 10,
  },

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
    paddingHorizontal: 10,
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
    color: "#fff",
  },
  red: {
    color: "red",
  },
  green: {
    color: "green",
  },
});

export default MinePage;
