import React from 'react';
import logo from './logo.svg';
import './app.css';
import { Card, CardHeader, CardBody, CardFooter, Text, Heading, Button } from '@chakra-ui/react'
import Navbar from './component/navbar';

function Home() {
  return (
    <>
    <Navbar />
    <Card align='center'>
  <CardHeader>
    <Heading size='md'>The Islamic Archive</Heading>
  </CardHeader>
  <CardBody>
    <Text>Bismillah!</Text>
  </CardBody>
  <CardFooter>
    <Button colorScheme='blue'>Continue here</Button>
  </CardFooter>
</Card>
</>
  );
}

export default Home;
