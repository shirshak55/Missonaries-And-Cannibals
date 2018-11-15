var BOAT_SIZE = 2;
let tree = [];
let successfulPath = [];

function is_success(state) {
  return state.left.cannibal    === 0 &&
         state.left.missionary  === 0 &&
         state.right.cannibal   === 3 &&
         state.right.missionary === 3;  
}

function opposite_bank(side) {
  if (side === 'left') return 'right';
  else return 'left';
}

function get_children(candidate) {
  var children = [];
  var state = candidate.state;
  var side  = state[state.boat];
  var other_side = opposite_bank(state.boat);

  for (var c = 0; c <= side.cannibal; c++) {
    if (c > BOAT_SIZE) continue;
    for (var m = 0; m <= side.missionary; m++) {
        if (c === 0 && m ===0) continue;
        if (c + m > BOAT_SIZE) break;
        if (m > 0 && c > m) continue;
        var obj = {
            from: candidate,
            state: {
              boat: other_side,
              left: {
                cannibal: (other_side === 'left') ? state.left.cannibal+c : state.left.cannibal-c,
                missionary: (other_side === 'left') ? state.left.missionary+m : state.left.missionary-m
              },
              right: {
                cannibal: (other_side === 'right') ? state.right.cannibal+c : state.right.cannibal-c,
                missionary: (other_side === 'right') ? state.right.missionary+m : state.right.missionary-m
              }
            }
        };
        if (obj.state.left.missionary > 0 
            && (obj.state.left.cannibal > obj.state.left.missionary)) continue;
        if (obj.state.right.missionary > 0
            && (obj.state.right.cannibal > obj.state.right.missionary)) continue;
        children.push(obj);
    }
  }
  return children;
}

function is_node_visited(visited, state) {
  for (var i = 0; i < visited.length; i++) {
      var v = visited[i];
      if (v.boat === state.boat 
          && v.left.cannibal === state.left.cannibal
          && v.left.missionary === state.left.missionary
          && v.right.cannibal === state.right.cannibal
          && v.right.missionary === state.right.missionary)
      return true;
  }
  return false;
}

function success_action(candidate) {
  const stack = [];
  while(candidate !== undefined){
    stack.push(candidate.state);
    candidate = candidate.from;
  }
  successfulPath = stack.reverse()
}

function generateTree(init_state) {
  var visited = [];
  var queue = [{state: init_state}];
  let i = 0;
  tree = [init_state];
  while (queue.length !== 0) {
     i++;
     let candidate = queue.splice(0,1)[0];
     if (is_node_visited(visited, candidate.state)) {
         continue;
     }
     if  (is_success(candidate.state)) {
         success_action(candidate);
     }
     visited.push(candidate.state);
     var children = get_children(candidate);
     tree.push(children);
     queue = queue.concat(children);
  }
}
generateTree({
    boat: 'left',
    left: {
      cannibal: 3,
      missionary: 3
    },
    right: {
      cannibal: 0,
      missionary: 0
    }
  });
export default {
  tree,
  successfulPath
}