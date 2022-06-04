const NoteReducer = (state,action) => {
    var temp = [...state];
    switch(action.type){
        case 'getAllNotesSuccess':
                return action.payload;
        case 'createNoteSuccess'  :
            temp.unshift(action.payload);
            return temp;
        case 'updateNoteSuccess'  :
            var index = state.findIndex(item => item.id===action.id);
            temp[index] = {...temp[index],...action.payload};
            return temp;
        case 'archiveNoteSuccess' :
            return temp.filter((item)=> item._id !== action.id);
        case 'deleteNoteSuccess' :
            return temp.filter((item)=> item._id !== action.id);
        default :
            return state;
    }
}

export default NoteReducer;