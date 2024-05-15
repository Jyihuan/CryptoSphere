import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const CoinChart = (props) => {
  // 假设这里是您获取的虚拟币近10天的价格数据
  const _ = [
    { date: "2024-04-01", price: 50000 },
    { date: "2024-04-02", price: 52000 },
    { date: "2024-04-03", price: 48000 },
    { date: "2024-04-01", price: 50000 },
    { date: "2024-04-02", price: 52000 },
    { date: "2024-04-03", price: 48000 },
    // 假设这里还有7天的数据
  ];

  const { chartData } = props;

  const data = chartData || _;

  // 将日期字符串转换为Date对象
  const formattedData = data.map((item) => ({
    label: item.date,
    value: item.price,
    dataPointText: item.price.toFixed(2),
  }));

  return (
    <View style={styles.container}>
      <LineChart data={formattedData} width={340} height={200} yAxisLabel="price" xAxisLabel="Date" xAxisLabelTextStyle={{ fontSize: 7 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default CoinChart;
