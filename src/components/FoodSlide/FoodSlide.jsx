import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  
} from "react-native";


export const FoodSlide = () => {
  const deviceWidth = Dimensions.get("window").width;
  const images = [
    {
      id: 0,
      img: require("../../../assets/food1.png"),
    },
    {
      id: 1,
      img: require("../../../assets/food2.png"),
    },
    {
      id: 2,
      img: require("../../../assets/food3.png"),
    },
    {
      id: 3,
      img: require("../../../assets/food4.png"),
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  const selectedItem = images.find((item) => item.id === currentIndex);
  return (
    <View style={{ width: deviceWidth, height: 200 }}>
      <ScrollView
        style={{ width: deviceWidth, height: 200 }}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset;
          const viewSize = event.nativeEvent.layoutMeasurement;
          const currentIndex = Math.floor(contentOffset.x / viewSize.width);
          setCurrentIndex(currentIndex);
        }}
      >
        <View style={{ width: "100%", height: 200 }}>
          <View>
            <Image
              source={selectedItem.img}
              style={{ width: deviceWidth, height: 200 }}
            />
          </View>
        </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
