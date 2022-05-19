import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, List, useTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  listItem: {
    paddingLeft: 40,
  }
});

const ListItem = ({ person }) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = React.useState(false);
  const handlePress = () => setExpanded(!expanded);
  return (
    <List.Accordion
      title={`${person.name.first} ${person.name.last}`}
      left={(props) => <List.Icon {...props} icon="account" />}
      expanded={expanded}
      onPress={handlePress}
      theme={{ colors: { primary: colors.accent } }}
    >
      <List.Item
        style={styles.listItem}
        title={person.email}
        description={person.phone}
        left={() => <Avatar.Image size={48} source={{ uri: person.picture.large }} />}
      />
      <List.Item
        style={styles.listItem}
        title={`${person.location.street.name} ${person.location.street.number}, ${person.location.postcode} ${person.location.city}, ${person.location.country}`}
      />
    </List.Accordion>
  );
};

export default ListItem;
