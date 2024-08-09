import React from "react";
import { Row, Col } from 'react-bootstrap';
import SVGIcon from "../components/icon";
import useScreenWidth from "../hooks/useScreenWidth.jsx";
import FancyButton from "../components/button.jsx";
import CodeHighlighter from "../components/code-highlighter.jsx";

const codeSnippet = {
    test:
    `
describe "#win" do
    it "vertical winning combo returns true" do
        board = Board.new
        board.board = [[" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "]]
        board.check_winner('x');
    end

    it "horizontal winning combo returns true" do
        board = Board.new
        board.board = [[" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", "x", "x", "x", "x", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "]]
        expect(board.check_winner('x')).to eq(true)
    end

    it "diagonal winning combo returns true" do
        board = Board.new
        board.board = [[" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", " ", " ", "x", " "],
                    [" ", " ", "x", "x", "x", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", "x", "x", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "]]
        expect(board.check_winner('x')).to eq(true)
    end

    it "diagonal winning combo returns true" do
        board = Board.new
        board.board = [[" ", " ", " ", " ", " ", " ", " "],
                    [" ", "x", " ", " ", " ", " ", " "],
                    [" ", " ", "x", "x", " ", " ", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", "x", "x", "x", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "]]
        expect(board.check_winner('x')).to eq(true)
    end

    it "no winning combo returns false" do
        board = Board.new
        board.board = [[" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", "x", "x", " ", "", " "],
                    [" ", " ", " ", "x", " ", " ", " "],
                    [" ", " ", "x", "x", "x", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "]]
        expect(board.check_winner('x')).to eq(false)
    end
end
    `,
    win:
    `
def winning_combinations
    rows = @board.length
    columns = @board[0].length
    winning_length = 4 
      
    row_indices = (0...rows).to_a
    column_indices = (0...columns).to_a
      
    horizontal = row_indices.flat_map do |row|
        column_indices.each_cons(winning_length).map { |column_chunk| column_chunk.map { |col| [row, col] } }
    end
      
    vertical = column_indices.flat_map do |column|
        row_indices.each_cons(winning_length).map { |row_chunk| row_chunk.map { |r| [r, column] } }
    end
      
    diagonal1 = (0...rows - winning_length + 1).flat_map do |row|
        (0...columns - winning_length + 1).map do |column|
            winning_length.times.map { |i| [row + i, column + i] }
        end
    end
      
    diagonal2 = (0...rows - winning_length + 1).flat_map do |row|
        (0...columns - winning_length + 1).map do |column|
            winning_length.times.map { |i| [row + i, column + winning_length - 1 - i] }
        end
    end
      
    horizontal + vertical + diagonal1 + diagonal2
end

def check_winner(symbol)
    winning_combinations.each do |combination|
        symbols = combination.map { |row, col| @board[row][col] }
        return true if symbols.uniq.length == 1 && symbols.first == symbol
    end
    false
end
    `
}

function ConnectFour() {
    const smallDevice = useScreenWidth();

    return (
        <div className={`card ${smallDevice ? 'my-5 p-2' : 'm-5'}`}>
            <Row className="my-4 light-blue-text">
                <Col>
                    <h1 className="text-center">Connect Four</h1>
                    <div className="d-flex justify-content-between">
                        <div>
                            <SVGIcon iconName={'ruby'} />
                            <SVGIcon iconName={'rspec'} classes={'ps-3'} />
                        </div>
                        <div className="d-flex gap-3">
                            <FancyButton text='Live' icon={'mingcute:github-line'} handleClick={() => window.open('https://replit.com/@blondymartinezm/Ruby-TDD-ConnectFour#main.rb', '_blank')} />
                            <FancyButton text={smallDevice ? '' : 'Repository'} icon={'mingcute:github-line'} handleClick={() => window.open('https://github.com/BlondyMartinez/Ruby-TDD-ConnectFour', '_blank')} />
                        </div>
                    </div>
                    <p>Developed in a Test-Driven Development (TDD) using Ruby and RSpec.</p>
                </Col>
            </Row>
            <Row className="my-4 text-white">
                <Col>
                    <h3 className="orange-text">Overview</h3>
                    <p>
                        Connect Four is a classic two-player game in which players take turns dropping colored discs from the top into a vertically suspended grid. 
                        The objective of the game is to connect four of one's own discs of the same color next to each other vertically, horizontally, or diagonally before the opponent.
                    </p>
                </Col>
            </Row>
        
            <Row className="my-4 text-white">
                <Col>
                    <h3 className="orange-text">Features</h3>
                    <ul>
                        <li>Interactive gameplay allowing two players to take turns.</li>
                        <li>Board display to visualize the game state.</li>
                        <li>Validation of player moves to ensure they are within the valid range and the chosen column is not full.</li>
                        <li>Detection of winning combinations to determine the winner.</li>
                    </ul>
                </Col>
                <Col xs={smallDevice ? 12 : 4}>
                    <div className="video-container">
                        <video 
                            src={'https://raw.githubusercontent.com/BlondyMartinez/React-Portfolio/master/src/videos/connectfour.mp4'}
                            className="project-video"
                            muted
                            loop
                            controls={false}
                            autoPlay={true}
                            onError={(e) => console.error('Video failed to load:', e)}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </Col>
            </Row>

            <Row className="my-4 text-white">
                <Col>
                    <h5 className="orange-text">Winning Tests</h5>
                    <CodeHighlighter code={codeSnippet.test} language={'rb'} />
                </Col>
                <Col>
                    <h5 className="orange-text">Winning Code</h5>
                    <CodeHighlighter code={codeSnippet.win} language={'rb'} />
                </Col>
            </Row>
        </div>
    );
}
  
export default ConnectFour;
  