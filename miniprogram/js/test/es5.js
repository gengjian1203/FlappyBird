var Animal = function (name, age) {
  this.name = name;
  this.age = age;
}

Animal.prototype.say = function () {
  console.log('Animal:', this.name, this.age);
}


var Cat = function (name, age) {
  Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.say1 = function () {
  console.log('Cat:', this.name, this.age);
}

var cat = new Cat('小猫咪', 3);
cat.say1();
