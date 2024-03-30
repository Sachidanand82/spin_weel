import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  StyleSheet,
  Image,
  velocity,
} from 'react-native';

const Task = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  const segmentData = [
    {style: styles.segment1},
    {style: styles.segment2},
    {style: styles.segment3},
    {style: styles.segment4},
    {style: styles.segment5},
    {style: styles.segment6},
    {style: styles.segment7},
    {style: styles.segment8},
  ];
  const totalProbability = segmentData.reduce(
    (acc, segment) => acc + segment.probability,
    0,
  );
  const numberOfSegments = segmentData.length; // Specify the number of segments

  const onSpinWheel = () => {
    let cumulativeProbability = 0;
    const randomValue = Math.random();

    // Find the segment based on its probability
    const selectedSegment = segmentData.find(segment => {
      cumulativeProbability += segment.probability / totalProbability;
      return randomValue <= cumulativeProbability;
    });

    const selectedSegmentIndex = segmentData.indexOf(selectedSegment);

    Animated.timing(spinValue, {
      toValue: 360 * 5 + (360 / numberOfSegments) * selectedSegmentIndex,
      useNativeDriver: true,
    }).start(() => {
      spinValue.setValue(0);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const coloredSegments = segmentData.map((segment, index) => {
    return (
      <View key={index} style={[styles.segment, segment.style]}>
        <Text style={styles.segmentText}>{segment.id}</Text>
      </View>
    );
  });

  const lines = Array.from({length: numberOfSegments}).map((_, index) => {
    const lineStyle = {
      ...styles.line,
      transform: [{rotate: `${(360 / numberOfSegments) * index}deg`}],
    };

    return <View key={index} style={lineStyle} />;
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.wheel, {transform: [{rotate: spin}]}]}>
        {coloredSegments}
        {lines}
        <View>
          <Text style={styles.name1}>Spin</Text>
          <Text style={styles.name2}>50%</Text>
          <Text style={styles.name3}>100rs</Text>
          <Text style={styles.name4}>0%</Text>
          <Text style={styles.name5}>80%</Text>
          <Text style={styles.name6}>40%</Text>
          <Text style={styles.name7}>Spin</Text>
          <Text style={styles.name8}>0%</Text>
        </View>
        <View style={styles.centerCircle} />
      </Animated.View>

      <TouchableOpacity onPress={onSpinWheel}>
        <View style={styles.button}></View>
        <View style={styles.buttonTextContainer}>
          <Text style={styles.buttonText}>Spin the Wheel</Text>
        </View>
      </TouchableOpacity>
      <View>
        <Text style={styles.lucky}>LUCKY DRAW</Text>
        <Text style={styles.spin}>SPIN THE WHEEL</Text>
      </View>
      <View>
        <Image
          source={require('../components/knob.png')}
          style={styles.arrowImage}
        />
      </View>
      <View>
        <Image
          source={require('../components/pickk.jpg')}
          style={styles.centerDot}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkblue',
  },
  lucky: {
    top: -420,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'sans serif',
  },
  spin: {
    marginTop: 10,
    top: -420,
    color: 'white',
    left: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  wheel: {
    top: 50,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 4,
    borderColor: 'black',
    overflow: 'hidden', // Ensure that segments don't overlap the border
  },
  segment: {
    position: 'absolute',
    top: 0,
    left: 150,
    width: 4,
    height: 150,
    backgroundColor: 'transparent', // Adjust the color of the segments
    transformOrigin: 'bottom', // Rotate around the bottom edge
  },
  line: {
    position: 'absolute',
    top: -5,
    left: 145,
    width: 4,
    height: 150,
    backgroundColor: 'white', // Adjust the color of the lines
    transformOrigin: 'bottom', // Rotate around the bottom edge
  },
  /* centerCircle: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'black',
    top: 40,
    left: 140,
  },*/
  centerDot: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 50,
    zIndex: 1,
    top: -300,
    left: -23,
  },
  arrowImage: {
    width: 40,
    height: 50,
    top: -372,
    left: -15,
    transform: [{rotate: '-8deg'}],
  },
  segmentText: {
    color: 'black',
  },
  button: {
    backgroundColor: 'blue',
  },
  buttonTextContainer: {
    top: 120,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  // Individual Segment Stylesheets
  segment1: {
    backgroundColor: '#C9E4D7',
    width: 140,
    height: 150,
    transform: [{rotate: '0deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 800,
    borderBottomStartRadius: 10,
    color: 'black',
  },
  name1: {
    color: 'black',
    width: 100,
    height: 100,
    top: 16,
    left: 170,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '290deg'}],
  },
  name2: {
    color: 'black',
    width: 100,
    height: 100,
    top: -10,
    left: 200,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '340deg'}],
  },
  name3: {
    color: 'black',
    width: 100,
    height: 100,
    top: -30,
    left: 170,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '395deg'}],
  },
  name4: {
    color: 'black',
    width: 100,
    height: 100,
    top: -100,
    left: 100,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '430deg'}],
  },
  name5: {
    color: 'black',
    width: 100,
    height: 100,
    top: -230,
    left: 30,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '470deg'}],
  },
  name6: {
    color: 'black',
    width: 100,
    height: 100,
    top: -395,
    left: -10,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '514deg'}],
  },
  name7: {
    color: 'black',
    width: 100,
    height: 100,
    top: -570,
    left: 20,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '560deg'}],
  },
  name8: {
    color: 'black',
    width: 100,
    height: 100,
    top: -710,
    left: 90,
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{rotate: '600deg'}],
  },
  segment2: {
    backgroundColor: '#C9E4D7',
    width: 120,
    height: 150,
    transform: [{rotate: '0deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 800,
    top: 0,
    left: 30,
    right: 0,
    bottom: 0,
  },
  segment3: {
    backgroundColor: '#C9E4D7',
    width: 120,
    height: 150,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 800,
    transform: [{rotate: '313deg'}],
    top: 40,
    left: 50,
    right: 0,
    bottom: 0,
  },
  segment4: {
    backgroundColor: '#C9E4D7',
    width: 110,
    height: 150,
    transform: [{rotate: '90deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 800,
    borderBottomStartRadius: 10,
    top: 56,
    left: -70,
    right: 0,
    bottom: 0,
  },
  segment5: {
    backgroundColor: '#C9E4D7',
    width: 180,
    height: 170,
    transform: [{rotate: '46deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
    top: 152,
    left: 7,
    right: 0,
    bottom: 0,
  },

  segment6: {
    backgroundColor: '#C9E4D7',
    width: 110,
    height: 150,
    transform: [{rotate: '0deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 10,
    top: 152,
    left: 150,
    right: 0,
    bottom: 0,
  },
  segment7: {
    backgroundColor: '#C9E4D7',
    width: 112,
    height: 150,
    transform: [{rotate: '318deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 800,
    borderBottomStartRadius: 10,
    top: 80,
    left: 249,
    right: 0,
    bottom: 0,
  },
  segment8: {
    backgroundColor: '#C9E4D7',
    width: 95,
    height: 190,
    transform: [{rotate: '405deg'}],
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 800,
    borderBottomStartRadius: 10,
    top: -10,
    left: 140,
    right: 0,
    bottom: 0,
  },
});

export default Task;