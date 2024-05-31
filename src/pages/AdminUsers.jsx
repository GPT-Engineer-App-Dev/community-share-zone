import { Container, VStack, Box, Text, Heading, Flex, Button, HStack, Input } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useReactions, useAddReaction, useUpdateReaction, useDeleteReaction } from '../integrations/supabase/index.js';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { data: reactions, isLoading, error } = useReactions();
  const addReactionMutation = useAddReaction();
  const updateReactionMutation = useUpdateReaction();
  const deleteReactionMutation = useDeleteReaction();
  const [editReactionId, setEditReactionId] = useState(null);
  const [editReactionEmoji, setEditReactionEmoji] = useState("");

  const handleEdit = (reaction) => {
    setEditReactionId(reaction.id);
    setEditReactionEmoji(reaction.emoji);
  };

  const handleSave = () => {
    updateReactionMutation.mutate({ id: editReactionId, emoji: editReactionEmoji });
    setEditReactionId(null);
    setEditReactionEmoji("");
  };

  const handleDelete = (reactionId) => {
    deleteReactionMutation.mutate(reactionId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reactions</div>;

  return (
    <Container maxW="container.lg" p={4}>
      <VStack spacing={8} align="stretch">
        <Flex as="nav" bg="blue.500" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="lg">Manage Reactions</Heading>
        </Flex>
        
        <Button colorScheme="blue" onClick={() => navigate(-1)}>Back</Button>

        <Box as="main">
          <VStack spacing={4}>
            {reactions.map((reaction) => (
              <Box key={reaction.id} w="100%" p={4} borderWidth="1px" borderRadius="lg">
                {editReactionId === reaction.id ? (
                  <HStack>
                    <Input
                      value={editReactionEmoji}
                      onChange={(e) => setEditReactionEmoji(e.target.value)}
                    />
                    <Button colorScheme="blue" onClick={handleSave}>Save</Button>
                  </HStack>
                ) : (
                  <Text>{reaction.emoji}</Text>
                )}
                <HStack mt={2}>
                  <Button size="sm" colorScheme="yellow" onClick={() => handleEdit(reaction)}>Edit</Button>
                  <Button size="sm" colorScheme="red" onClick={() => handleDelete(reaction.id)}>Delete</Button>
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