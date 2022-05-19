import * as React from 'react';
import { useState } from 'react';
import {
  DataTable, FAB, Modal, Portal, useTheme
} from 'react-native-paper';
import { ScrollView, Share } from 'react-native';
import { getData } from './data';

const onShare = async (message) => {
  try {
    const result = await Share.share({
      message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    // error
  }
};

const GroupButton = ({ shareString, componentId }) => {
  const [FABState, setFABState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [modalTableData, setModalTableData] = useState({});
  const { colors } = useTheme();
  const actions = [];
  if (shareString) {
    actions.push({
      icon: 'share',
      label: 'Share',
      onPress: () => onShare(shareString),
    });
  }

  if (componentId) {
    actions.push({
      icon: 'file-table',
      label: 'Statistics',
      onPress: () => getData(componentId).then((data) => {
        setModalTableData(data);
        setModalState(true);
      }),
    });
  }

  return (
    <Portal>
      <FAB.Group
        open={FABState}
        icon={FABState ? 'minus' : 'plus'}
        onStateChange={({ open }) => setFABState(open)}
        actions={actions}
      />
      <Modal
        visible={modalState}
        onDismiss={() => setModalState(false)}
        contentContainerStyle={{ backgroundColor: colors.background, padding: 20 }}
        style={{ height: '100%' }}
      >
        <ScrollView>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Id</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>Count</DataTable.Title>
            </DataTable.Header>
            {Object.entries(modalTableData).map(([key, value]) => {
              const date = new Date(key * 1);
              return (
                <DataTable.Row key={key}>
                  <DataTable.Cell>{key}</DataTable.Cell>
                  <DataTable.Cell>
                    {date.getDate()}
                    .
                    {date.getMonth()}
                    .
                    {date.getFullYear()}
                  </DataTable.Cell>
                  <DataTable.Cell numeric>{value}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default GroupButton;
