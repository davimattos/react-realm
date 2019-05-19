import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Repository from '~/components/Repository';

import {
  Container, Title, Form, Input, Submit, List
} from './styles';

import { List } from 'realm';

export default function Main() {
  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input 
          autoCapitalize="nome"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={() => {}}>
          <Icon name="add" size={22} color="#FFF" />
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={[]}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Repository data={item} />
        )}
        />
    </Container>
  );
}