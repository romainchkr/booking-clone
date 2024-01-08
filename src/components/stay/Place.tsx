import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { ListingPlace } from '@/src/interfaces/listingPlace'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import ListingPage from '@/app/stay/listing';

interface Props {
	data: ListingPlace;
}

const Place = ({
  data: {
    id,
    name,
    propertyType,
    rating,
    reviewNumber,
    district,
    distanceFromCenter,
    image,
    price,
    sustainability,
  },
}: Props) => {
  const router = useRouter();

  const getRatingText = (rating: number) => {
    if (rating >= 9) {
      return "Excellent";
    } else if (rating >= 8) {
      return "Very Good";
    } else if (rating >= 7) {
      return "Good";
    } else {
      return "Ok";
    }
  };

  const onLikePlace = () => {
    // TODO : like using redux
  }

  const onListingPlacePress = () => {
    // router.push(`/stay/${id}/`)
    router.push({
      pathname: "/stay/[id]/",
      params: {
        id: `${id}`,
      },
    });
  }

  return (
    <TouchableOpacity onPress={() => onListingPlacePress()}>
      <View style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.rightContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{name}</Text>
            <TouchableOpacity onPress={() => onLikePlace()}>
              {false ? (
                <FontAwesome name="heart" size={20} color={Colors.red} />
              ) : (
                <FontAwesome name="heart-o" size={20} color="black" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              <Text style={{ color: Colors.white, fontFamily: "mon-sb" }}>
                {rating.toFixed(1)}
              </Text>
            </View>
            <Text style={{fontFamily: "mon-sb",}}>{" "}{getRatingText(rating)}</Text>
            <Text style={styles.review}>
              {" "}
              {"\u2022"} {reviewNumber} reviews
            </Text>
          </View>

          <View style={styles.locationRow}>
            <FontAwesome name="map-marker" size={16} color="black" />
            <Text>
              {" "}
              {district} {"\u2022"} {distanceFromCenter} from center
            </Text>
          </View>

          <View style={styles.sustainabilityContainer}>
            {Array.from({ length: 3 }, (_, index) => (
              <FontAwesome5
                key={index}
                name="leaf"
                size={16}
                color={index < sustainability ? Colors.green : Colors.darkgrey}
              />
            ))}
            <Text
              style={{ color: Colors.green, fontFamily: "mon", fontSize: 13 }}
            >
              {" "}
              Travel sustainable
            </Text>
          </View>

          <View style={styles.alignRightContainer}>
            <Text style={{ fontFamily: "mon-sb", textAlign: "right" }}>
              {propertyType}
            </Text>
            <Text
              style={{ fontFamily: "mon-sb", textAlign: "right", fontSize: 18 }}
            >
              {price} €
            </Text>
            <Text
              style={{
                fontFamily: "mon",
                textAlign: "right",
                color: Colors.darkgrey,
                fontSize: 13
              }}
            >
              Includes taxes and charges
            </Text>
          </View>

          {/* <Text style={styles.text}>
            {item.region}, {item.country}
          </Text>
          <Text style={styles.text}>{item.properties} properties</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Place

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    // height: 250,
  },
  image: {
    flex: 4,
    borderRadius: 15,
  },
  rightContainer: {
    flex: 6,
    gap: 8,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "mon-b",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    backgroundColor: Colors.primary,
    padding: 4,
    borderRadius: 5,
  },
  review: {
    color: Colors.darkgrey,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  sustainabilityContainer: {
    flexDirection: "row",
  },

  alignRightContainer: {
    flex: 1,
    gap: 5,
  }
})