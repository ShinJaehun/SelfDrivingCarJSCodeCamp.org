const canvas = document.getElementById("myCanvas");
// canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");

// car.draw(ctx);  // 이거 그대로 둬서 sensor update할 때 계속 알 수 없는 오류가 있었음.
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []); // traffic끼리 collision 처리하지 말고
    }

    car.update(road.borders, traffic); // car와 traffic의 collision 처리만!

    canvas.height = window.innerHeight;

    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.7);

    road.draw(ctx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx, "red");
    }
    car.draw(ctx, "blue");

    ctx.restore();
    requestAnimationFrame(animate);
}