import React, { useEffect, useState } from 'react';
import JSSoup from 'jssoup';
import { Card, Paragraph } from 'react-native-paper';
import CardBackground from '../static/relaxApp/background.jpg';

const PredictionBlock = () => {
  const [prediction, setPrediction] = useState('');
  useEffect(() => {
    if (!prediction) {
      fetch('https://horo.mail.ru/')
        .then((r) => r.text())
        .then((response) => {
          let resultNode;
          const soup = new JSSoup(response);
          const predictionNodes = soup.findAll('div');
          predictionNodes.forEach((node) => {
            if (node.attrs.class === 'article__item article__item_alignment_left article__item_html') {
              resultNode = node;
            }
          });
          setPrediction(resultNode.getText());
        });
    }
  }, [prediction]);

  return (
    <Card style={{ width: '90%', alignSelf: 'center', marginBottom: 5 }}>
      <Card.Cover source={CardBackground} />
      <Card.Content>
        <Card.Title title="Гороскоп на сегодня" />
        <Paragraph>
          {prediction}
        </Paragraph>
      </Card.Content>

    </Card>
  );
};
export default PredictionBlock;
