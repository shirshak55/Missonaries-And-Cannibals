var BOAT_SIZE = 2;
let tree = [];



function is_success(candidate, n) {
  var state = candidate.state;
  return state.left.cannibal    == 0 &&
         state.left.missionary  == 0 &&
         state.right.cannibal   == n &&
         state.right.missionary == n;  
}

function get_candidate_index(fringe){
  return 0;
}

function get_other_side(side) {
  if (side == 'left') return 'right';
  else return 'left';
}

function get_children(candidate) {
  var children = [];
  var state = candidate.state;
  var side  = state[state.boat];
  var other_side = get_other_side(state.boat);

  for (var c = 0; c <= side.cannibal; c++) {
    if (c > BOAT_SIZE) continue;
    for (var m = 0; m <= side.missionary; m++) {
        if (c == 0 && m ==0) continue;
        if (c + m > BOAT_SIZE) break;
        if (m > 0 && c > m) continue;
        var obj = {
            from: candidate,
            state: {
              boat: other_side,
              left: {
                cannibal: (other_side == 'left') ? state.left.cannibal+c : state.left.cannibal-c,
                missionary: (other_side == 'left') ? state.left.missionary+m : state.left.missionary-m
              },
              right: {
                cannibal: (other_side == 'right') ? state.right.cannibal+c : state.right.cannibal-c,
                missionary: (other_side == 'right') ? state.right.missionary+m : state.right.missionary-m
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

function contains(visited, state) {
  for (var i = 0; i < visited.length; i++) {
      var v = visited[i];
      if (v.boat == state.boat 
          && v.left.cannibal == state.left.cannibal
          && v.left.missionary == state.left.missionary
          && v.right.cannibal == state.right.cannibal
          && v.right.missionary == state.right.missionary)
      return true;
  }
  return false;
}

function do_success(candidate) {
    var ls = [];
    while (candidate != undefined) {
      ls.push(candidate);
      candidate = candidate.from;
    }
    for (var i = ls.length-1; i >= 0; i--) {
      tree.push(ls[i].state);
    }
}

function generateTree(init_state) {
  var visited = [];
  var fringe = [{state: init_state}];
  while (fringe.length != 0) {
     var idx = get_candidate_index(fringe);
     var candidate = fringe.splice(idx,1)[0];
     if (contains(visited, candidate.state)) {
         continue;
     }
     if  (is_success(candidate, 3)) {
         do_success(candidate);
     }
     visited.push(candidate.state);
     var children = get_children(candidate);
     fringe = fringe.concat(children);
  }
}
function init(n) {
  return {
    boat: 'left',
    left: {
      cannibal: n,
      missionary: n
    },
    right: {
      cannibal: 0,
      missionary: 0
    }
  };
}
generateTree(init(3))
console.log(tree)
export default tree;