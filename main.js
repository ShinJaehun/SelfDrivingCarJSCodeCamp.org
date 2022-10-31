const canvas = document.getElementById("myCanvas");
// canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;  // canvas를 삭제할 필요 없이 이걸 여기로 옮겨서 문제 해결!
    car.draw(ctx);
    requestAnimationFrame(animate);
}