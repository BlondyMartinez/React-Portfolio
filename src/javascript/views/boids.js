import React from "react";
import { Row, Col } from 'react-bootstrap';
import SVGIcon from "../components/icon";
import GifPlusSnippet from "../components/gif-plus-snippet";
import alignment from '../../videos/boids/alignment.gif';
import cohesion from '../../videos/boids/cohesion.gif';
import separation from '../../videos/boids/separation.gif';
import colorbias from '../../videos/boids/colorbias.gif';
import containment from '../../videos/boids/containment.gif';
import obstacles from '../../videos/boids/obstacles.gif';
import predator from '../../videos/boids/predator.gif';
import boids from '../../videos/boids/boids.gif';
import blueprints from '../../videos/boids/blueprints.png';
import uiss from '../../videos/boids/UI.png'
import Feature from "../components/feature";
import ImageZoom from "../components/image-zoom.jsx";
import useScreenWidth from "../hooks/useScreenWidth.jsx";
import FancyButton from "../components/button.jsx";

const codeSnippet = {
    alignment:
        `
FVector ABoid::Alignment(const TArray<ABoid*>& neighbours)
{
    if (neighbours.Num() == 0) return FVector::ZeroVector;

    FVector newVelocity;
    int count = 0;

    for (ABoid* boid : neighbours) {
        // if there's no color bias OR if there is and they are the same color
        if (!parameters->colorBias || (parameters->colorBias && boid->color == this->color)) {
            newVelocity += boid->currentVelocity;
            count++;
        }
    }

    if (count != 0) newVelocity /= count;
    newVelocity.Normalize();

    return newVelocity;
}`,
    cohesion:
        `
FVector ABoid::Cohesion(const TArray<ABoid*>& neighbours)
{
    if (neighbours.Num() == 0) return FVector::ZeroVector;

    FVector avgPos;
    int count = 0;

    for (ABoid* boid : neighbours) {
        // if there's no color bias OR if there is and they are the same color
        if (!parameters->colorBias || (parameters->colorBias && boid->color == this->color)) {
            avgPos += boid->GetActorLocation();
            count++;
        }
    }
            
    if (count != 0) avgPos /= count;

    return Seek(avgPos);
}`,
    separation:
        `
FVector ABoid::Separation(const TArray<ABoid*>& neighbours)
{
    if (neighbours.Num() == 0) return FVector::ZeroVector;

    FVector separationForce;
    float minDistance = FLT_MAX;

    for (ABoid* boid : neighbours) {
        float distance = FVector::Dist(GetActorLocation(), boid->GetActorLocation());
        FVector fleeForce = Flee(boid->GetActorLocation());

        // weight by inverse distance
        fleeForce *= 1 / FMath::Max(distance, 1.0f);
        separationForce += fleeForce;

        if (distance < minDistance) {
            minDistance = distance;
        }
    }

    // 110 being the boid diameter plus 10
    if (minDistance < 110) {
        separationForce *= FMath::Lerp(5, 1.0f, minDistance / 110);
    }

    return separationForce;
}`,
    obstacles:
        `
FVector ABoid::ObstacleAvoidance(const TArray<AActor*>& obstacles)
{
    FVector avoidance = FVector::ZeroVector;

    for (AActor* obstacle : obstacles) {
        FVector toObstacle = obstacle->GetActorLocation() - GetActorLocation();
        float distance = toObstacle.Size();
        float obstacleRadius = obstacle->GetActorScale3D().X * 100 * .5f;

        if (distance < parameters->neighbourhoodRadius + obstacleRadius) {
            FVector avoidanceDirection = -toObstacle.GetSafeNormal();
            float avoidanceStrength = FMath::Clamp(1.0f - (distance / (parameters->neighbourhoodRadius + obstacleRadius)), 0.0f, 1.0f);
            avoidance += avoidanceDirection * avoidanceStrength * parameters->obstacleAvoidanceForce;
        }
    }

    return avoidance;
}`,
    containment:
    `
FVector ABoid::ApplyContainment()
{
	FVector toCentre = manager->sphereCentre - GetActorLocation();
	float distance = toCentre.Size();

	if (distance > manager->sphereRadius) {
		// soft boundary
		float force = FMath::Clamp((distance - manager->sphereRadius) / 500, 0, 1);
		FVector correction = toCentre.GetSafeNormal() * (distance - manager->sphereRadius);
		return correction * force * parameters->containmentForce;
	}

	return FVector::ZeroVector;
}
    `,
    predator:
    `
FVector ABoid::Evade(const TArray<APredator*>& predators)
{
	FVector evasionVelocity = FVector::ZeroVector;
	int predatorCount = 0;

	for (APredator* predator : predators) {
		FVector toPredator = predator->GetActorLocation() - GetActorLocation();
		float distance = toPredator.Size();

		if (distance < (parameters->neighbourhoodRadius + 150) && distance > 100) {
			// predict future position of predator
			float predictionTime = distance / parameters->predatorSpeed;
			FVector futurePos = predator->GetActorLocation() + predator->currentVelocity * predictionTime * 5;

			// flee from futurepos
			evasionVelocity = GetActorLocation() - futurePos;

			predatorCount++;
		}
		else if (distance < 100) {
			KillBoid();
			return FVector::ZeroVector;
		}
	}

	if (predatorCount > 0) {
		evasionVelocity /= predatorCount;
		evasionVelocity.Normalize();
	}

	return evasionVelocity;
}
    `,colorbias:
    `
FVector ABoid::Repulsion(const TArray<ABoid*>& neighbours)
{
	FVector repulsion = FVector::ZeroVector;

	for (ABoid* boid : neighbours) {
		// if different color and too close boid gets repulsed
		if (boid->color != color) {
			FVector toBoid = boid->GetActorLocation() - GetActorLocation();
			float distance = toBoid.Size();

			if (distance < 500) {
				FVector repulsionDirection = -toBoid.GetSafeNormal();
				float force = FMath::Clamp((500 - distance) / 500, 0, 1);
				repulsion += repulsionDirection * force * parameters->repulsionForce;
			}
		}
	}

	return repulsion;
}
    `,
    hash:
    `
void AGridActor::GenerateGrid()
{
	// cell size is sphere diameter divided by grid resolution
	float cellSize = (2 * sphereRadius) / gridRes;

	// get corner of the cell
	FVector startPoint = sphereCentre - FVector(sphereRadius);

	// 3 loops to cover entire volume of the sphere
	for (int x = 0; x < gridRes; x++) {
		for (int y = 0; y < gridRes; y++) {
			for (int z = 0; z < gridRes; z++) {
				// get cell centre by calculating the distance to move from startPoint to the corner of the current cell + half cell size
				FVector cellCentre = startPoint + FVector(z * cellSize, y * cellSize, x * cellSize) + FVector(cellSize * .5f);
				gridCells.Add(GridCell{ cellCentre, cellSize });
			}
		}
	}
}

void ABoid::GetNearbyEntities()
{
	// clear arrays
	nearbyBoids.Empty();
	nearbyPredators.Empty();

	inDanger = false;
	Saturate(0);

	// get cell index and adjacent indices
	FVector pos = GetActorLocation();
	int currentCellIndex = grid->GetCellIndex(pos);

	TArray<int> adjacentCellIndices = grid->GetAdjacentCellIndices(currentCellIndex);

	// add current cell stuff
	for (ABoid* boid : grid->GetBoidsInCell(currentCellIndex)) {
		if (boid == this || !IsValid(boid)) continue;

		float distance = (GetActorLocation() - boid->GetActorLocation()).Size();
		if (distance < parameters->neighbourhoodRadius) {
			nearbyBoids.Add(boid);
		}
	}

	for (APredator* predator : grid->GetPredatorsInCell(currentCellIndex)) {
		if (!nearbyPredators.Contains(predator) && IsValid(predator)) AddPredator(predator);
	}

	// add adjacent cells stuff
	for (int cellIndex : adjacentCellIndices) {
		for (ABoid* boid : grid->GetBoidsInCell(cellIndex)) {
			if (!nearbyBoids.Contains(boid) && boid != this && IsValid(boid)) {
				float distance = (GetActorLocation() - boid->GetActorLocation()).Size(); 
				if (distance < parameters->neighbourhoodRadius) {
					nearbyBoids.Add(boid);
				}
			}
		}

		for (APredator* predator : grid->GetPredatorsInCell(cellIndex)) {
			if (!nearbyPredators.Contains(predator) && IsValid(predator)) AddPredator(predator);
		}
	} 
}
    `,
}

function Boids() {
    const smallDevice = useScreenWidth();

    return (
        <div className={`card ${smallDevice ? 'my-5 p-2' : 'm-5'}`}>
            <Row className="my-4 light-blue-text">
                <Col>
                    <h1 className="text-center">Unreal Boid Simulation</h1>
                    <div className="d-flex justify-content-between">
                        <div>
                            <SVGIcon iconName={'cpp'} />
                            <SVGIcon iconName={'ue'} classes={'ps-3'} />
                        </div>
                        <FancyButton className="float-end" text={smallDevice ? '' : 'Repository'} icon={'mingcute:github-line'} handleClick={() => window.open('https://github.com/BlondyMartinez/Boids', '_blank')} />
                    </div>
                    <p>This project simulates the flocking behavior using Unreal Engine, allowing interactive adjustments to observe the effects on flocking dynamics.</p>
                    <p className="text-white"><strong className="orange-text">Note:</strong> This project was created using Unreal Engine 5.3.2. Opening it in a different version may cause compatibility issues and could potentially break the simulation.</p>
                </Col>
            </Row>
        
            <Row className="my-4 text-white">
                <Col>
                    <h3 className="orange-text">Overview</h3>
                    <p>
                        The simulation allows you to adjust various parameters via a user-friendly UI and interactively spawn, delete boids, obstacles, and predators. This creates a dynamic environment to observe different behaviors. 
                        All the core logic for the simulation was developed using C++, while the user interface was crafted using Unreal Engine Blueprints.
                    </p>
                </Col>
            </Row>
        
            <Row className="my-4 text-white">
                <Col>
                    <h3 className="orange-text">Features</h3>
                    <ul>
                        <li><strong>Flocking Behavior:</strong> Simulates alignment, cohesion, and separation.</li>
                        <li><strong>Obstacles:</strong> Spawn and delete obstacles that affect boid navigation.</li>
                        <li><strong>Predators:</strong> Add predators to create predator-prey dynamics.</li>
                        <li><strong>Hash Partitioning:</strong> Optimizes performance for efficient neighbour searching.</li>
                        <li><strong>Adjustable Parameters via UI:</strong> Modify color bias, repulsion, containment, and more.</li>
                    </ul>

                    <Row>
                        <Col sm={11} lg={6}>
                            <h5 className="light-blue-text">Flocking Behavior</h5>
                            <p>
                                The simulation accurately models the natural flocking behavior observed in birds, fish, and other animals. 
                                It implements three core principles: <span className="orange-text fs-6">alignment</span> (steering towards the average heading of neighbours), 
                                <span className="orange-text fs-6"> cohesion</span> (steering towards the average position of neighbours), and <span className="orange-text fs-6">separation</span> (steering to avoid crowding local flockmates). 
                                These behaviors work together to create realistic and dynamic group movements, simulating how creatures in nature navigate their environment collectively.
                            </p>
                            <GifPlusSnippet gif={alignment} snippet={codeSnippet.alignment} language={'cpp'} order={'last'} />
                            <GifPlusSnippet gif={cohesion} snippet={codeSnippet.cohesion} language={'cpp'} order={'first'} />
                            <GifPlusSnippet gif={separation} snippet={codeSnippet.separation} language={'cpp'} order={'last'} />
                        </Col>
                        <Col sm={11} lg={6}>
                            <Feature 
                                feature={'Obstacle Avoidance'} 
                                description={`The simulation environment can be populated with obstacles that boids must navigate around. You can spawn and delete these obstacles at will, creating complex terrains and challenges for the flock. This feature adds an additional layer of interaction and complexity, as it tests the boids' ability to avoid collisions and adapt their paths in real-time.`}
                                gif={obstacles}
                                snippet={codeSnippet.obstacles}
                                language={'cpp'}
                                order={'last'}
                                sm={11}
                                lg={12}
                            />
                            <Feature 
                                feature={'Containment'} 
                                description={`Boids stay within a 3D sphere, avoiding boundary breaches, simulating natural containment.`}
                                gif={containment}
                                snippet={codeSnippet.containment}
                                language={'cpp'}
                                order={'last'}
                                sm={11}
                                lg={12}
                            />
                        </Col>
                        
                        <Feature 
                            feature={'Predator Evasion'} 
                            description={`Introduce predators into the simulation to create a predator-prey dynamic. Predators will actively seek out and pursue boids, adding tension and urgency to the flock's movements. This feature highlights survival behaviors, as boids will attempt to evade predators, leading to more chaotic and unpredictable flocking patterns.`}
                            gif={predator}
                            snippet={codeSnippet.predator}
                            language={'cpp'}
                            order={'last'}
                        />
                        
                        <Col sm={11} lg={6}>
                            <Feature 
                                feature={'Color Bias and Repulsion'} 
                                description={`Boids show color preference, flocking with similar colors if color bias is active; otherwise, no bias. With color bias active, boids repel differently colored neighbors, adding a new repulsion force.`}
                                gif={colorbias}
                                snippet={codeSnippet.colorbias}
                                language={'cpp'}
                                order={'last'}
                                sm={11}
                                lg={12}
                            />
                            <Col>
                                <h5 className="light-blue-text">Adjustable Parameters via UI</h5>
                                <p>
                                    A comprehensive user interface built with Unreal Engine Blueprints allows real-time modification of various simulation parameters. 
                                    You can adjust settings like color bias, which affects the visual appearance of the boids, repulsion, which controls how strongly boids avoid each other, 
                                    and containment, which keeps boids within certain boundaries. This feature enables you to experiment with different scenarios and observe how small changes can drastically alter flocking dynamics.
                                </p>
                                <Row>
                                    <Col className={`d-flex ${smallDevice ? 'flex-column' : 'justify-content-between'}`}>
                                        <ImageZoom src={uiss} />
                                        <ImageZoom src={blueprints} />
                                    </Col>
                                </Row>
                            </Col>
                        </Col>

                        <Col sm={11} lg={12}>
                            <h5 className="light-blue-text">Hash Partitioning</h5>
                            <p>
                                To ensure the simulation runs smoothly even with a large number of boids, a hash partitioning algorithm is implemented. This technique optimizes the process of finding nearby neighbors by dividing the simulation space into smaller, manageable sections. 
                                As a result, the boids only check for neighbours within their partition, significantly reducing the computational load and allowing for efficient, real-time updates to the flock's behavior.
                            </p>
                            <GifPlusSnippet gif={boids} snippet={codeSnippet.hash} language={'cpp'} order={'first'} boids={true} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
  
export default Boids;
  