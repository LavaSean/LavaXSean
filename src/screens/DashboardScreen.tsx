import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';
import { tamaguiStyles } from './TamaguiStyles';
import { auth, db } from '../../firebase';
import { Star } from '@tamagui/lucide-icons';
import BackButton from '../components/Buttons/BackButton';

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [averageRating, setAverageRating] = useState(0);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [ratingCategories, setRatingCategories] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const feedbackRef = db.collection('feedback');

    feedbackRef
      .get()
      .then((querySnapshot) => {
        let totalRatings = 0;
        let totalCount = 0;
        const categoryCounts = [0, 0, 0, 0, 0]; // Initialize category counts

        querySnapshot.forEach((doc) => {
          const feedbackData = doc.data();
          const rating = feedbackData.ratings; // Assuming the rating value is stored in the "ratings" field
          totalRatings += rating;
          totalCount += 1;

          // Determine the category based on the rating and increment the corresponding count
          if (rating >= 0 && rating <= 1) categoryCounts[0]++;
          else if (rating > 1 && rating <= 2) categoryCounts[1]++;
          else if (rating > 2 && rating <= 3) categoryCounts[2]++;
          else if (rating > 3 && rating <= 4) categoryCounts[3]++;
          else if (rating > 4 && rating <= 5) categoryCounts[4]++;
        });

        if (totalCount > 0) {
          const avgRating = totalRatings / totalCount;
          setAverageRating(avgRating);
          setTotalFeedback(totalCount);
          setRatingCategories(categoryCounts);
        }
      })
      .catch((error) => {
        console.error('Error fetching feedback:', error);
      });
  }, []);

  const chartData = {
    labels: ['0-1', '1.1-2', '2.1-3', '3.1-4', '4.1-5'],
    datasets: [
      {
        data: ratingCategories,
      },
    ],
  };
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <tamaguiStyles.Container alignItems='flex-start' justifyContent='flex-start' paddingHorizontal='$5'>
        <BackButton onPress={() => navigation.goBack()} />
        <tamaguiStyles.TextTitle marginBottom='3%'>Dashboard</tamaguiStyles.TextTitle>
        <tamaguiStyles.XRecContainer height='20%' marginBottom='5%'>
          <tamaguiStyles.ColumnContainer width='100%' alignItems='center' justifyContent='center'>
            <tamaguiStyles.TextBody style={{fontSize: 16}}>Average Rating</tamaguiStyles.TextBody>
            <tamaguiStyles.RowContainer width='25%' justifyContent='space-between'>
              <tamaguiStyles.TextTitle style={{fontSize: 40}}>{averageRating.toFixed(1)}</tamaguiStyles.TextTitle>
              <Star color='black'/>
            </tamaguiStyles.RowContainer>
            <tamaguiStyles.TextBody style={{fontSize: 14, color: '#959595'}}>from {totalFeedback} feedbacks</tamaguiStyles.TextBody>
          </tamaguiStyles.ColumnContainer>
        </tamaguiStyles.XRecContainer>

        <tamaguiStyles.TextBody style={{fontSize: 18}}>Feedback Ratings Barchart</tamaguiStyles.TextBody>
        <tamaguiStyles.TextBody marginBottom='5%' color='#959595'>Have a quick review of feedback ratings</tamaguiStyles.TextBody>
        <tamaguiStyles.RowContainer alignItems='center'>
          <BarChart
            data={chartData}
            width={screenWidth*0.88}
            height={300}
            showBarTops={false}
            yAxisLabel=''
            yAxisSuffix=''
            showValuesOnTopOfBars={true}
            withInnerLines={false}
            chartConfig={{
              backgroundColor: "#CCCCCC",
              backgroundGradientFrom: "#e0e0e0",
              backgroundGradientTo: "#f7f2f2",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              barRadius: 10,
              barPercentage: 0.8,
            }}
            style={{
              borderRadius: 16,
            }}
          />
        </tamaguiStyles.RowContainer>
      </tamaguiStyles.Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default DashboardScreen;
