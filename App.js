import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import { db, collection, addDoc, getDocs, deleteDoc, doc } from './firebaseConfig';

export default function App() {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);

  const addNotes = async () => {
    try {
      const noteData = {
        content: note,
      };
      const docRef = await addDoc(collection(db, 'notes'), noteData);
      console.log('Note added successfully with id: ' + docRef.id);
      setNotesList([...notesList, { id: docRef.id, content: note }]);
      setNote(''); // Clear the input field after adding a note
    } catch (error) {
      console.log('Error adding: ' + error.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const docRef = doc(db, 'notes', id);
      await deleteDoc(docRef);
      console.log('Delete note success: ' + id);
      setNotesList(notesList.filter((note) => note.id !== id)); // Update local state to remove the deleted note
    } catch (error) {
      console.log('Error deleting: ' + error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'notes'));
        const notesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotesList(notesData);
      } catch (error) {
        console.log('Error fetching data: test ' + error.message);
      }
    };

    fetchData();
  }, []);

  const Item = ({ note }) => (
    <View style={styles.item}>
      <Text style={styles.note}>{note.content}</Text>
      <TouchableOpacity onPress={() => deleteNote(note.id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notes App ODP BNI</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a note..."
        value={note}
        onChangeText={(text) => setNote(text)}
      />
      <StatusBar style="auto" />
      <TouchableOpacity style={styles.button} onPress={addNotes}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={notesList}
        renderItem={({ item }) => <Item note={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 50,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#000000',
    textAlign: 'center',
    margin: 10,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#000000',
    borderRadius: 10,
    width: 300,
    color: '#000000',
  },
  button: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 10,
    width: 300,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: '#008CBA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  item: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    height: 60,
    width: 300,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  note: {
    fontSize: 16,
    color: '#333',
  },
  delete: {
    color: 'red',
  },
});




  // useEffect(() => {
    // const addData = async () => {
    //   try {
    //     const docRef = await addDoc(collection(db, "users"), {
    //       first: "Ada4",
    //       last: "Lovelace3",
    //       born: 1815
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // }
    // addData(); // Call the async function immediately
//     const readData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "users"));
//   querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
//   console.log(doc.data());
// });
//       } catch (e) { 
//         console.log('error reading : ', e);
//       }
//     }
//     readData();
//   }, []);

