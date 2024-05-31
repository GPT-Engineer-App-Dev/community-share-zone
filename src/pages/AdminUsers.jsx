import { Container, VStack, Box, Text, Heading, Flex, Button, HStack, Input } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const AdminUsers = () => {
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
  ]);
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState("");

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditUserName(user.name);
  };

  const handleSave = () => {
    setUsers(users.map(user => user.id === editUserId ? { ...user, name: editUserName } : user));
    setEditUserId(null);
    setEditUserName("");
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Manage Users</Heading>
        </Flex>
        
        <Button colorScheme="blue" onClick={() => navigate(-1)}>Back</Button>

        <Box as="main">
          <VStack spacing={4}>
            {users.map((user) => (
              <Box key={user.id} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                {editUserId === user.id ? (
                  <HStack>
                    <Input
                      value={editUserName}
                      onChange={(e) => setEditUserName(e.target.value)}
                    />
                    <Button colorScheme="blue" onClick={handleSave}>Save</Button>
                  </HStack>
                ) : (
                  <Text>{user.name}</Text>
                )}
                <HStack mt={2}>
                  <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(user)}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(user.id)}>Delete</Button>
                </HStack>
              </Box>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default AdminUsers;