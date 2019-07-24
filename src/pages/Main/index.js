import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import getRealm from '~/services/realm';

import Repository from '~/components/Repository';

import {
  Container, Title, Form, Input, Submit, List
} from './styles';

export default function Main() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();

      const data = realm.objects('Repository').sorted('stars', true);

      setRepositories(data);
    }
    loadRepositories();
  }, [loading]);

  async function saveRepository(repository) {
    const data = {
      id: repository.id,
      name: repository.name,
      fullname: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Repository', data, "modified");
    });

    return data
  };

  async function handleAddRepository() {
    try{
      setLoading(true);
      const response = await api.get(`/repos/${input}`);

      await saveRepository(response.data);
      
      setInput('');
      Keyboard.dismiss();
    } catch (err) {
      console.tron.warn('Erro')
    }
    setLoading(false);
  };

  async function handleRefreshRepository(repository) {
    const response = await api.get(`/repos/${repository.fullName}`);

    const data = await saveRepository(response.data);

    setRepositories(repositories.map(repo => repo.id === data.id ? data : repo))
  };

  return (
    <Container>
      <Title>Repositórios</Title>

      <Form>
        <Input
          value={input}
          onChangeText={setInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Procurar repositório..."
        />
        <Submit onPress={handleAddRepository}>
          {loading 
            ?  <ActivityIndicator size="large" color="#FFF" />
            :  <Icon name="add" size={30} color="#FFF" />}
        </Submit>
      </Form>

      <List
        keyboardShouldPersistTaps="handled"
        data={repositories}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Repository data={item} onRefresh={() => handleRefreshRepository(item)}/>
        )}
        />
    </Container>
  );
}