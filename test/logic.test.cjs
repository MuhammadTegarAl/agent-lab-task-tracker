const test=require("node:test"),assert=require("node:assert/strict"),L=require("../logic.js");
test("add trims and validates",()=>{const x=L.add([],"  Write  ");assert.equal(x[0].title,"Write");assert.throws(()=>L.add([],"  "))});
test("edit, complete and delete",()=>{let x=[L.createTask("A","a")];x=L.edit(x,"a","B");assert.equal(x[0].title,"B");x=L.toggle(x,"a");assert.equal(x[0].completed,true);assert.equal(L.remove(x,"a").length,0)});
test("filters partition tasks",()=>{const x=[{id:"a",completed:false},{id:"b",completed:true}];assert.equal(L.filter(x,"active").length,1);assert.equal(L.filter(x,"completed").length,1);assert.equal(L.filter(x,"all").length,2)});
test("storage saves, loads and recovers malformed JSON",()=>{const map=new Map(),s={getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,v)};const x=[L.createTask("Saved","x")];assert.equal(L.save(x,s),true);assert.deepEqual(L.load(s),x);assert.deepEqual(L.load({getItem:()=>"bad"}),[])});
