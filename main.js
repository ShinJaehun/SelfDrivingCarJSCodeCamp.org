const canvas = document.getElementById("myCanvas");
// canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// car.draw(ctx);  // 이거 그대로 둬서 sensor update할 때 계속 알 수 없는 오류가 있었음.

animate();

function animate() {
    // car.update();
    car.update(road.borders); // 도로 경계를 sensor에게 넘기기 위해

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    car.draw(ctx);

    ctx.restore();
    requestAnimationFrame(animate);
}