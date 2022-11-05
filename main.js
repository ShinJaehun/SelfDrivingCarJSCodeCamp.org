const carCanvas = document.getElementById("carCanvas");
// canvas.height = window.innerHeight;
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
// canvas.height = window.innerHeight;
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");


const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
// const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS");
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "AI");


// car.draw(ctx);  // 이거 그대로 둬서 sensor update할 때 계속 알 수 없는 오류가 있었음.
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
];

animate();

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []); // traffic끼리 collision 처리하지 말고
    }

    car.update(road.borders, traffic); // car와 traffic의 collision 처리만!

    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;

    carCtx.save();
    carCtx.translate(0, -car.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    car.draw(carCtx, "blue");

    carCtx.restore();

    networkCtx.lineDashOffset = -time / 50;
    Visualizer.drawNetwork(networkCtx, car.brain);
    requestAnimationFrame(animate);
}