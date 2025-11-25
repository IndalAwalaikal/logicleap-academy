// src/pages/RobotMissionGame.tsx
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Play,
  Volume2,
  VolumeX,
  Trophy,
  Zap,
  ChevronRight,
  RotateCcw,
  Code,
  Map,
  Battery,
  Settings,
} from "lucide-react";
import { Howl, Howler } from "howler";

// ========== TYPES ==========
type Direction = "up" | "right" | "down" | "left";
type CellType = "empty" | "wall" | "rock" | "water";

interface RobotPosition {
  x: number;
  y: number;
  dir: Direction;
}

interface Level {
  id: number;
  title: string;
  description: string;
  goal: string;
  grid: CellType[][];
  robotStart: RobotPosition;
  batteryPos: { x: number; y: number };
  obstacles: { x: number; y: number }[];
  allowedFunctions: string[];
  hint: string;
  timeLimit?: number;
  battery: number;
}

// ========== LEVELS YANG DIPERBAIKI ==========
const LEVELS: Level[] = [
  {
    id: 1,
    title: "Langkah Pertama",
    description:
      "Robot menghadap ke atas. Bawa ke baterai dengan satu perintah.",
    goal: "moveForward()",
    grid: [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 2, y: 4, dir: "up" },
    batteryPos: { x: 2, y: 3 },
    obstacles: [],
    allowedFunctions: ["moveForward"],
    hint: "moveForward()",
    battery: 100,
  },
  {
    id: 2,
    title: "Belok Kanan",
    description: "Robot menghadap ke atas. Belok kanan, lalu maju ke baterai.",
    goal: "turnRight()\nmoveForward()",
    grid: [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 1, y: 4, dir: "up" },
    batteryPos: { x: 2, y: 4 },
    obstacles: [],
    allowedFunctions: ["moveForward", "turnRight"],
    hint: "turnRight()\nmoveForward()",
    battery: 100,
  },
  {
    id: 3,
    title: "Belok Kiri",
    description: "Robot menghadap ke kanan. Belok kiri, lalu maju ke baterai.",
    goal: "turnLeft()\nmoveForward()",
    grid: [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 2, y: 2, dir: "right" },
    batteryPos: { x: 2, y: 3 },
    obstacles: [],
    allowedFunctions: ["moveForward", "turnLeft"],
    hint: "turnLeft()\nmoveForward()",
    battery: 100,
  },
  {
    id: 4,
    title: "Loop Sederhana",
    description: "Gunakan for loop untuk maju 2 langkah.",
    goal: "for i := 0; i < 2; i++ {\n    moveForward()\n}",
    grid: [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 2, y: 4, dir: "up" },
    batteryPos: { x: 2, y: 2 },
    obstacles: [],
    allowedFunctions: ["moveForward"],
    hint: "for i := 0; i < 2; i++ {\n    moveForward()\n}",
    battery: 100,
  },
  {
    id: 5,
    title: "Navigasi Sederhana",
    description: "Cari jalan memutar untuk menghindari dinding.",
    goal: "turnRight()\nmoveForward()\nmoveForward()\nturnLeft()\nmoveForward()",
    grid: [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "wall", "wall", "wall", "empty"],
      ["empty", "wall", "empty", "wall", "empty"],
      ["empty", "wall", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "wall", "empty"],
    ],
    robotStart: { x: 0, y: 4, dir: "right" },
    batteryPos: { x: 4, y: 0 },
    obstacles: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 1, y: 3 },
      { x: 3, y: 4 },
    ],
    allowedFunctions: ["moveForward", "turnRight", "turnLeft"],
    hint: "// Rute: Kanan -> Atas -> Atas -> Kiri -> Atas\n// Perintah:\nturnRight()\nmoveForward()\nmoveForward()\nturnLeft()\nmoveForward()",
    battery: 80,
  },
  {
    id: 6,
    title: "Pattern Berulang",
    description: "Gunakan loop untuk pola berulang.",
    goal: "for i := 0; i < 3; i++ {\n    moveForward()\n    turnRight()\n    moveForward()\n    turnLeft()\n}",
    grid: [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 0, y: 6, dir: "right" },
    batteryPos: { x: 6, y: 0 },
    obstacles: [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 4, y: 3 },
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 4, y: 6 },
    ],
    allowedFunctions: ["moveForward", "turnRight", "turnLeft"],
    hint: "// Gunakan loop untuk pola zig-zag\nfor i := 0; i < 3; i++ {\n    moveForward()\n    turnRight()\n    moveForward()\n    turnLeft()\n}",
    battery: 70,
  },
  {
    id: 7,
    title: "Kondisional Sederhana",
    description: "Gunakan if statement untuk navigasi otomatis.",
    goal: "for i := 0; i < 6; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnRight()\n    }\n}",
    grid: [
      ["empty", "empty", "empty", "empty", "empty"],
      ["empty", "wall", "wall", "wall", "empty"],
      ["empty", "empty", "empty", "wall", "empty"],
      ["empty", "wall", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 0, y: 4, dir: "right" },
    batteryPos: { x: 4, y: 2 },
    obstacles: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 1, y: 3 },
    ],
    allowedFunctions: ["moveForward", "turnRight", "turnLeft", "canMove"],
    hint: "// Gunakan loop dengan conditional\nfor i := 0; i < 6; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnRight()\n    }\n}",
    battery: 60,
  },
  {
    id: 8,
    title: "Navigasi Kompleks",
    description: "Kombinasikan loop dan conditional untuk rute kompleks.",
    goal: "for i := 0; i < 8; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnLeft()\n        if canMove() {\n            moveForward()\n        } else {\n            turnRight()\n            turnRight()\n            moveForward()\n        }\n    }\n}",
    grid: [
      ["empty", "empty", "water", "empty", "empty"],
      ["empty", "rock", "empty", "water", "empty"],
      ["empty", "empty", "empty", "rock", "empty"],
      ["water", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "water", "empty", "empty"],
    ],
    robotStart: { x: 0, y: 4, dir: "right" },
    batteryPos: { x: 4, y: 0 },
    obstacles: [
      { x: 1, y: 1 },
      { x: 3, y: 2 },
    ],
    allowedFunctions: ["moveForward", "turnRight", "turnLeft", "canMove"],
    hint: "// Gunakan nested if statements\nfor i := 0; i < 8; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnLeft()\n        if canMove() {\n            moveForward()\n        } else {\n            turnRight()\n            turnRight()\n            moveForward()\n        }\n    }\n}",
    battery: 50,
  },
  {
    id: 9,
    title: "Algoritma Maze",
    description: "Implementasi algoritma maze solver sederhana.",
    goal: "for i := 0; i < 12; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnRight()\n        if !canMove() {\n            turnLeft()\n            turnLeft()\n        }\n    }\n}",
    grid: [
      ["empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "wall", "wall", "empty", "wall", "empty"],
      ["empty", "wall", "empty", "empty", "wall", "empty"],
      ["empty", "empty", "empty", "wall", "empty", "empty"],
      ["empty", "wall", "empty", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "wall", "wall", "empty"],
    ],
    robotStart: { x: 0, y: 5, dir: "right" },
    batteryPos: { x: 5, y: 0 },
    obstacles: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 4, y: 1 },
      { x: 1, y: 2 },
      { x: 4, y: 2 },
      { x: 3, y: 3 },
      { x: 1, y: 4 },
      { x: 3, y: 5 },
      { x: 4, y: 5 },
    ],
    allowedFunctions: ["moveForward", "turnRight", "turnLeft", "canMove"],
    hint: "// Algorithm: selalu ikuti dinding kanan\nfor i := 0; i < 12; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnRight()\n        if !canMove() {\n            turnLeft()\n            turnLeft()\n        }\n    }\n}",
    battery: 40,
  },
  {
    id: 10,
    title: "Misi Final - Master Programmer",
    description: "Semua tantangan digabung! Waktunya jadi master.",
    goal: "for i := 0; i < 20; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnLeft()\n        if !canMove() {\n            turnRight()\n            turnRight()\n        }\n    }\n}",
    grid: [
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
      ["empty", "wall", "wall", "wall", "empty", "wall", "wall", "empty"],
      ["empty", "wall", "empty", "wall", "empty", "empty", "wall", "empty"],
      ["empty", "wall", "empty", "empty", "wall", "empty", "empty", "empty"],
      ["empty", "empty", "empty", "wall", "empty", "empty", "wall", "empty"],
      ["empty", "wall", "empty", "empty", "empty", "wall", "empty", "empty"],
      ["empty", "wall", "wall", "empty", "wall", "wall", "empty", "empty"],
      ["empty", "empty", "empty", "empty", "empty", "empty", "empty", "empty"],
    ],
    robotStart: { x: 0, y: 7, dir: "right" },
    batteryPos: { x: 7, y: 0 },
    obstacles: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 5, y: 1 },
      { x: 6, y: 1 },
      { x: 1, y: 2 },
      { x: 3, y: 2 },
      { x: 6, y: 2 },
      { x: 1, y: 3 },
      { x: 4, y: 3 },
      { x: 3, y: 4 },
      { x: 6, y: 4 },
      { x: 1, y: 5 },
      { x: 5, y: 5 },
      { x: 1, y: 6 },
      { x: 2, y: 6 },
      { x: 4, y: 6 },
      { x: 5, y: 6 },
    ],
    allowedFunctions: ["moveForward", "turnRight", "turnLeft", "canMove"],
    hint: "// Algorithm: selalu ikuti dinding kiri\nfor i := 0; i < 20; i++ {\n    if canMove() {\n        moveForward()\n    } else {\n        turnLeft()\n        if !canMove() {\n            turnRight()\n            turnRight()\n        }\n    }\n}",
    timeLimit: 90,
    battery: 30,
  },
];

// ========== UTILS ==========
const DIRECTIONS = {
  up: { dx: 0, dy: -1 },
  right: { dx: 1, dy: 0 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
};

const dirToAngle = { up: -90, right: 0, down: 90, left: 180 };

// ========== GAME COMPONENT ==========
const RobotMissionGame = () => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userCode, setUserCode] = useState("");
  const [gameState, setGameState] = useState<
    "idle" | "running" | "success" | "failed"
  >("idle");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [robot, setRobot] = useState<RobotPosition>(LEVELS[0].robotStart);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentBattery, setCurrentBattery] = useState(LEVELS[0].battery);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const bgMusicRef = useRef<Howl | null>(null);
  const stepSoundRef = useRef<Howl | null>(null);
  const successSoundRef = useRef<Howl | null>(null);
  const errorSoundRef = useRef<Howl | null>(null);
  const clickSoundRef = useRef<Howl | null>(null);

  // --- AUDIO SETUP ---
  useEffect(() => {
    const loadSound = (src: string, volume: number = 0.5) => {
      return new Howl({
        src: [src],
        volume,
        onloaderror: () => console.warn(`Failed to load sound: ${src}`),
      });
    };

    bgMusicRef.current = loadSound("/sounds/mission.mp3", 0.25);
    bgMusicRef.current.loop(true);
    stepSoundRef.current = loadSound("/sounds/step.wav", 0.5);
    successSoundRef.current = loadSound("/sounds/succes.mp3", 0.7);
    errorSoundRef.current = loadSound("/sounds/error.ogg", 0.6);
    clickSoundRef.current = loadSound("/sounds/click.mp3", 0.5);

    return () => {
      [
        bgMusicRef,
        stepSoundRef,
        successSoundRef,
        errorSoundRef,
        clickSoundRef,
      ].forEach((ref) => ref.current?.unload());
    };
  }, []);

  // --- HANDLE MUSIC PLAY/PAUSE ---
  useEffect(() => {
    if (isPlaying && soundEnabled && bgMusicRef.current) {
      if (!bgMusicRef.current.playing()) {
        bgMusicRef.current.play();
      }
    } else if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
  }, [isPlaying, soundEnabled]);

  // --- TIMER ---
  useEffect(() => {
    if (gameState !== "running" || !LEVELS[currentLevel].timeLimit) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return LEVELS[currentLevel].timeLimit!;
        if (prev <= 1) {
          clearInterval(timer);
          setGameState("failed");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, currentLevel]);

  // --- CANVAS RENDERING ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const level = LEVELS[currentLevel];
    const cellSize = Math.min(
      400 / level.grid[0].length,
      400 / level.grid.length
    );
    const gridWidth = level.grid[0].length;
    const gridHeight = level.grid.length;
    const offsetX = (canvas.width - gridWidth * cellSize) / 2;
    const offsetY = (canvas.height - gridHeight * cellSize) / 2;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid with different terrain
    for (let y = 0; y < gridHeight; y++) {
      for (let x = 0; x < gridWidth; x++) {
        const left = offsetX + x * cellSize;
        const top = offsetY + y * cellSize;
        const cellType = level.grid[y][x];

        // Base floor
        let fillColor = y % 2 === x % 2 ? "#2d3748" : "#232d3e";

        // Different terrain types
        switch (cellType) {
          case "water":
            fillColor = "#3182ce";
            break;
          case "rock":
            fillColor = "#718096";
            break;
          case "wall":
            fillColor = "#e53e3e";
            break;
        }

        ctx.fillStyle = fillColor;
        ctx.fillRect(left, top, cellSize, cellSize);

        // Terrain patterns
        if (cellType === "water") {
          ctx.fillStyle = "rgba(49, 130, 206, 0.6)";
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(
              left + cellSize / 4 + (i * cellSize) / 4,
              top + cellSize / 2,
              cellSize / 8,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        } else if (cellType === "rock") {
          ctx.fillStyle = "#a0aec0";
          ctx.beginPath();
          ctx.arc(
            left + cellSize / 3,
            top + cellSize / 3,
            cellSize / 6,
            0,
            Math.PI * 2
          );
          ctx.arc(
            left + (cellSize * 2) / 3,
            top + (cellSize * 2) / 3,
            cellSize / 5,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }

        // Grid lines
        ctx.strokeStyle = "#4a5568";
        ctx.lineWidth = 1;
        ctx.strokeRect(left, top, cellSize, cellSize);
      }
    }

    // Draw obstacles
    level.obstacles.forEach(({ x, y }) => {
      const left = offsetX + x * cellSize;
      const top = offsetY + y * cellSize;

      ctx.fillStyle = "#e53e3e";
      ctx.fillRect(left + 2, top + 2, cellSize - 4, cellSize - 4);

      // Wall pattern
      ctx.strokeStyle = "#c53030";
      ctx.lineWidth = 2;
      ctx.strokeRect(left + 5, top + 5, cellSize - 10, cellSize - 10);
    });

    // Draw battery
    const bat = level.batteryPos;
    const batteryX = offsetX + bat.x * cellSize + cellSize / 2;
    const batteryY = offsetY + bat.y * cellSize + cellSize / 2;

    // Battery body
    ctx.fillStyle = "#d69e2e";
    ctx.fillRect(
      batteryX - cellSize / 3,
      batteryY - cellSize / 4,
      cellSize / 1.5,
      cellSize / 2
    );

    // Battery tip
    ctx.fillStyle = "#d69e2e";
    ctx.fillRect(
      batteryX + cellSize / 3,
      batteryY - cellSize / 6,
      cellSize / 6,
      cellSize / 3
    );

    // Battery details
    ctx.fillStyle = "#ecc94b";
    ctx.fillRect(
      batteryX - cellSize / 4,
      batteryY - cellSize / 6,
      cellSize / 2,
      cellSize / 3
    );

    // Battery glow
    ctx.fillStyle = "rgba(214, 158, 46, 0.3)";
    ctx.beginPath();
    ctx.arc(batteryX, batteryY, cellSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw robot
    const r = robot;
    const robotX = offsetX + r.x * cellSize + cellSize / 2;
    const robotY = offsetY + r.y * cellSize + cellSize / 2;
    ctx.save();
    ctx.translate(robotX, robotY);
    ctx.rotate((dirToAngle[r.dir] * Math.PI) / 180);

    // Robot body
    ctx.fillStyle = gameState === "success" ? "#38a169" : "#3182ce";
    ctx.fillRect(-cellSize / 3, -cellSize / 4, cellSize / 1.75, cellSize / 2);

    // Robot armor plates
    ctx.strokeStyle = "#2b6cb0";
    ctx.lineWidth = 2;
    ctx.strokeRect(-cellSize / 3, -cellSize / 4, cellSize / 1.75, cellSize / 2);

    // Robot head (dome)
    ctx.fillStyle = "#2b6cb0";
    ctx.beginPath();
    ctx.arc(0, -cellSize / 3, cellSize / 5, 0, Math.PI * 2);
    ctx.fill();

    // Visor
    ctx.fillStyle = "#63b3ed";
    ctx.beginPath();
    ctx.arc(0, -cellSize / 3, cellSize / 8, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (LED)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(-cellSize / 8, -cellSize / 3, cellSize / 15, 0, Math.PI * 2);
    ctx.arc(cellSize / 8, -cellSize / 3, cellSize / 15, 0, Math.PI * 2);
    ctx.fill();

    // Antenna
    ctx.strokeStyle = currentBattery > 20 ? "#38a169" : "#e53e3e";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -cellSize / 1.8);
    ctx.lineTo(0, -cellSize / 1.2);
    ctx.stroke();
    ctx.fillStyle = currentBattery > 20 ? "#38a169" : "#e53e3e";
    ctx.beginPath();
    ctx.arc(0, -cellSize / 1.2, cellSize / 12, 0, Math.PI * 2);
    ctx.fill();

    // Arms
    ctx.fillStyle = "#2d3748";
    ctx.fillRect(-cellSize / 2, -cellSize / 8, cellSize / 6, cellSize / 4);
    ctx.fillRect(
      cellSize / 2 - cellSize / 6,
      -cellSize / 8,
      cellSize / 6,
      cellSize / 4
    );

    // Tracks/wheels
    ctx.fillStyle = "#1a202c";
    ctx.fillRect(-cellSize / 2.5, cellSize / 4, cellSize / 1.2, cellSize / 8);

    // Wheel details
    ctx.fillStyle = "#4a5568";
    for (let i = -2; i <= 2; i++) {
      ctx.fillRect(
        (i * cellSize) / 6 - cellSize / 20,
        cellSize / 4,
        cellSize / 10,
        cellSize / 8
      );
    }

    ctx.restore();

    // Success particles
    if (gameState === "success") {
      ctx.fillStyle = "#d69e2e";
      for (let i = 0; i < 15; i++) {
        const angle = (i / 15) * Math.PI * 2;
        const dist = cellSize * (0.6 + Math.random() * 0.3);
        ctx.beginPath();
        ctx.arc(
          robotX + Math.cos(angle) * dist,
          robotY + Math.sin(angle) * dist,
          3 + Math.random() * 3,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }, [robot, currentLevel, gameState, currentBattery]);

  // --- SIMULATION ENGINE YANG LEBIH BAIK ---
  const simulateCode = (
    code: string
  ): { success: boolean; steps: RobotPosition[] } => {
    const steps: RobotPosition[] = [];
    let x = LEVELS[currentLevel].robotStart.x;
    let y = LEVELS[currentLevel].robotStart.y;
    let dir: Direction = LEVELS[currentLevel].robotStart.dir;
    let success = false;
    let battery = LEVELS[currentLevel].battery;

    const maxX = LEVELS[currentLevel].grid[0].length - 1;
    const maxY = LEVELS[currentLevel].grid.length - 1;
    const obstacles = LEVELS[currentLevel].obstacles;

    // Fungsi-fungsi robot
    const moveForward = () => {
      if (battery <= 0) return false;
      const { dx, dy } = DIRECTIONS[dir];
      const newX = x + dx;
      const newY = y + dy;

      // Check boundaries
      if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) return false;

      // Check obstacles
      if (obstacles.some((obs) => obs.x === newX && obs.y === newY))
        return false;

      // Check terrain
      const cellType = LEVELS[currentLevel].grid[newY][newX];
      if (cellType === "wall" || cellType === "water") return false;

      x = newX;
      y = newY;
      battery -= 5;
      steps.push({ x, y, dir });
      return true;
    };

    const turnRight = () => {
      if (battery <= 0) return;
      const dirs: Direction[] = ["up", "right", "down", "left"];
      const idx = dirs.indexOf(dir);
      dir = dirs[(idx + 1) % 4];
      battery -= 2;
      steps.push({ x, y, dir });
    };

    const turnLeft = () => {
      if (battery <= 0) return;
      const dirs: Direction[] = ["up", "right", "down", "left"];
      const idx = dirs.indexOf(dir);
      dir = dirs[(idx + 3) % 4];
      battery -= 2;
      steps.push({ x, y, dir });
    };

    const canMove = (): boolean => {
      const { dx, dy } = DIRECTIONS[dir];
      const newX = x + dx;
      const newY = y + dy;

      if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) return false;
      if (obstacles.some((obs) => obs.x === newX && obs.y === newY))
        return false;

      const cellType = LEVELS[currentLevel].grid[newY][newX];
      return cellType !== "wall" && cellType !== "water";
    };

    try {
      const cleanCode = code.trim();
      console.log("Executing code:", cleanCode);

      // Simple interpreter untuk kode Go
      let lines = cleanCode
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("//"));
      let linePointer = 0;
      let executedCommands = 0;
      const maxCommands = 100;

      while (
        linePointer < lines.length &&
        battery > 0 &&
        executedCommands < maxCommands
      ) {
        const line = lines[linePointer];

        // Basic commands
        if (line === "moveForward()") {
          if (!moveForward()) break;
          executedCommands++;
          linePointer++;
        } else if (line === "turnRight()") {
          turnRight();
          executedCommands++;
          linePointer++;
        } else if (line === "turnLeft()") {
          turnLeft();
          executedCommands++;
          linePointer++;
        }
        // For loop handling
        else if (line.startsWith("for i := 0; i <")) {
          const countMatch = line.match(/i < (\d+)/);
          if (countMatch) {
            const loopCount = parseInt(countMatch[1]);
            const loopStart = linePointer;
            let loopEnd = linePointer;
            let braceCount = 0;

            // Find the end of the loop
            for (let i = linePointer; i < lines.length; i++) {
              if (lines[i].includes("{")) braceCount++;
              if (lines[i].includes("}")) braceCount--;
              if (braceCount === 0 && i > linePointer) {
                loopEnd = i;
                break;
              }
            }

            // Execute the loop
            for (let i = 0; i < loopCount && battery > 0; i++) {
              let innerPointer = loopStart + 1;
              while (innerPointer < loopEnd && battery > 0) {
                const innerLine = lines[innerPointer];

                if (innerLine === "moveForward()") {
                  if (!moveForward()) break;
                  executedCommands++;
                } else if (innerLine === "turnRight()") {
                  turnRight();
                  executedCommands++;
                } else if (innerLine === "turnLeft()") {
                  turnLeft();
                  executedCommands++;
                } else if (innerLine.startsWith("if canMove()")) {
                  // Handle if canMove inside loop
                  if (canMove()) {
                    // Execute next line (should be moveForward)
                    if (
                      innerPointer + 1 < loopEnd &&
                      lines[innerPointer + 1] === "moveForward()"
                    ) {
                      if (!moveForward()) break;
                      executedCommands++;
                      innerPointer++; // Skip moveForward line
                    }
                  }
                  // Skip to closing brace
                  let ifBraceCount = 0;
                  for (let j = innerPointer; j < loopEnd; j++) {
                    if (lines[j].includes("{")) ifBraceCount++;
                    if (lines[j].includes("}")) ifBraceCount--;
                    if (ifBraceCount === 0) {
                      innerPointer = j;
                      break;
                    }
                  }
                }

                innerPointer++;
              }
            }

            linePointer = loopEnd + 1;
          } else {
            linePointer++;
          }
        }
        // If statement handling
        else if (line.startsWith("if canMove()")) {
          if (canMove()) {
            // Execute the true branch (next line should be moveForward)
            if (
              linePointer + 1 < lines.length &&
              lines[linePointer + 1] === "moveForward()"
            ) {
              if (!moveForward()) break;
              executedCommands++;
              linePointer += 2; // Skip if line and moveForward line
            }
          } else {
            // Skip to else or end of if
            let ifBraceCount = 0;
            let foundElse = false;
            for (let i = linePointer; i < lines.length; i++) {
              if (lines[i].includes("{")) ifBraceCount++;
              if (lines[i].includes("}")) ifBraceCount--;
              if (lines[i].includes("else") && ifBraceCount === 1) {
                foundElse = true;
                linePointer = i;
                break;
              }
              if (ifBraceCount === 0) {
                linePointer = i + 1;
                break;
              }
            }

            if (foundElse) {
              // Execute else branch
              if (
                linePointer + 1 < lines.length &&
                lines[linePointer + 1] === "moveForward()"
              ) {
                if (!moveForward()) break;
                executedCommands++;
                linePointer += 2;
              }
            }
          }
        } else {
          // Unknown command, skip
          linePointer++;
        }

        // Check if we reached the battery
        const bat = LEVELS[currentLevel].batteryPos;
        if (x === bat.x && y === bat.y) {
          success = true;
          break;
        }
      }

      // Final check
      const bat = LEVELS[currentLevel].batteryPos;
      success = success || (x === bat.x && y === bat.y && battery > 0);

      console.log(
        "Final position:",
        { x, y },
        "Battery:",
        battery,
        "Success:",
        success
      );
    } catch (e) {
      console.error("Simulation error:", e);
      success = false;
    }

    return { success, steps };
  };

  // --- RUN CODE dengan debugging ---
  const runUserCode = () => {
    if (gameState === "running" || isAnimating) return;
    if (soundEnabled && clickSoundRef.current) clickSoundRef.current.play();

    setGameState("running");
    setCurrentBattery(LEVELS[currentLevel].battery);
    if (LEVELS[currentLevel].timeLimit) {
      setTimeLeft(LEVELS[currentLevel].timeLimit!);
    }

    console.log("=== RUNNING USER CODE ===");
    console.log("Level:", currentLevel + 1);
    console.log("User code:", userCode);
    console.log("Start position:", LEVELS[currentLevel].robotStart);
    console.log("Battery position:", LEVELS[currentLevel].batteryPos);

    const result = simulateCode(userCode);

    console.log("Simulation result:", result);
    console.log("=== END SIMULATION ===");

    if (result.success) {
      animateSteps(result.steps);
    } else {
      setGameState("failed");
      if (soundEnabled && errorSoundRef.current) errorSoundRef.current.play();
      setTimeout(() => setGameState("idle"), 2000);
    }
  };

  // --- ANIMASI LANGKAH ---
  const animateSteps = (steps: RobotPosition[]) => {
    setIsAnimating(true);
    let i = 0;

    const animate = () => {
      if (i < steps.length) {
        setRobot(steps[i]);

        // Update battery (linear consumption)
        const batteryUsed =
          (LEVELS[currentLevel].battery * (i + 1)) / (steps.length || 1);
        setCurrentBattery(
          Math.max(0, LEVELS[currentLevel].battery - batteryUsed)
        );

        if (soundEnabled && stepSoundRef.current) stepSoundRef.current.play();
        i++;
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, 500);
      } else {
        setGameState("success");
        setIsAnimating(false);
        if (soundEnabled && successSoundRef.current)
          successSoundRef.current.play();
        setTimeout(() => {
          if (currentLevel < LEVELS.length - 1) {
            setCurrentLevel((prev) => prev + 1);
            setGameState("idle");
            setUserCode("");
            setTimeLeft(null);
          }
        }, 1500);
      }
    };
    animate();
  };

  // --- RESET ---
  const resetLevel = () => {
    setRobot(LEVELS[currentLevel].robotStart);
    setGameState("idle");
    setUserCode("");
    setCurrentBattery(LEVELS[currentLevel].battery);
    setTimeLeft(null);
  };

  useEffect(() => {
    setUserCode("");
    setRobot(LEVELS[currentLevel].robotStart);
    setGameState("idle");
    setCurrentBattery(LEVELS[currentLevel].battery);
    setTimeLeft(null);
  }, [currentLevel]);

  // --- START SCREEN ---
  if (!isPlaying) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl p-8 bg-gray-800 border border-blue-500/30 rounded-2xl text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl rotate-45 flex items-center justify-center">
                  <Code className="h-10 w-10 text-white rotate-[-45deg]" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-yellow-400">
              🤖 Robot Mission: Go Edition
            </h1>

            <p className="text-gray-300 mb-6 text-lg max-w-2xl mx-auto">
              Kendalikan robot dengan kode Go! 10 misi menantang yang
              mengajarkan pemrograman dari dasar hingga advanced. Jadilah master
              programmer!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 bg-gray-700 border border-blue-500">
                <Map className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <h3 className="font-bold text-yellow-400">10 Misi</h3>
                <p className="text-sm text-gray-400">Tantangan bertingkat</p>
              </Card>
              <Card className="p-4 bg-gray-700 border border-red-500">
                <Battery className="h-8 w-8 mx-auto mb-2 text-red-400" />
                <h3 className="font-bold text-yellow-400">Sistem Baterai</h3>
                <p className="text-sm text-gray-400">Kelola energi robot</p>
              </Card>
              <Card className="p-4 bg-gray-700 border border-green-500">
                <Settings className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <h3 className="font-bold text-yellow-400">Multi Terrain</h3>
                <p className="text-sm text-gray-400">
                  Berbagai jenis rintangan
                </p>
              </Card>
            </div>

            <div className="flex justify-center gap-4 mb-6 flex-wrap">
              <Button
                onClick={() => setIsPlaying(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg shadow-lg transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                Mulai Petualangan
              </Button>
              <Button
                variant="outline"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="border-blue-500 text-blue-400 px-6 py-3"
              >
                {soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500">
              💡 Gunakan headphone untuk pengalaman terbaik! | 🎮 10 Level
              Menantang | ⚡ Fitur Baru: Baterai & Timer
            </p>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // --- GAME SCREEN ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Header dengan Info Game */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-yellow-400">
                Misi {currentLevel + 1}: {LEVELS[currentLevel].title}
              </h2>
              <Trophy className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-gray-300">{LEVELS[currentLevel].description}</p>
          </div>

          <div className="flex gap-4 items-center">
            {/* Battery Indicator */}
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-blue-500/20">
              <Battery
                className={`h-5 w-5 ${
                  currentBattery > 50
                    ? "text-green-400"
                    : currentBattery > 20
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              />
              <span className="text-sm font-mono">{currentBattery}%</span>
            </div>

            {/* Timer */}
            {timeLeft !== null && (
              <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-blue-500/20">
                <span className="text-sm font-mono">
                  ⏱️ {Math.floor(timeLeft / 60)}:
                  {(timeLeft % 60).toString().padStart(2, "0")}
                </span>
              </div>
            )}

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="text-gray-300 hover:text-white"
            >
              {soundEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowMap(!showMap)}
              className="text-gray-300 hover:text-white"
            >
              <Map className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Canvas dan Map */}
          <div className="space-y-4">
            <Card className="bg-gray-800 border border-blue-500/20 p-4 flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                className="bg-gray-900 rounded-xl border border-blue-500/30 shadow-lg"
              />
            </Card>

            {showMap && (
              <Card className="bg-gray-800 border border-blue-500/20 p-4">
                <h3 className="font-semibold mb-3 text-yellow-400 flex items-center gap-2">
                  <Map className="h-5 w-5" />
                  Peta Misi
                </h3>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  {LEVELS.map((level, index) => (
                    <div
                      key={level.id}
                      className={`p-3 rounded-lg text-center cursor-pointer transition-all ${
                        index === currentLevel
                          ? "bg-yellow-500 text-white"
                          : index < currentLevel
                          ? "bg-green-500 text-white"
                          : "bg-gray-600 text-gray-300"
                      }`}
                      onClick={() => setCurrentLevel(index)}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="text-center text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
              🧭 Robot menghadap:{" "}
              <strong className="text-yellow-400">
                {robot.dir === "up"
                  ? "ATAS"
                  : robot.dir === "right"
                  ? "KANAN"
                  : robot.dir === "down"
                  ? "BAWAH"
                  : "KIRI"}
              </strong>
              <div className="mt-2 flex justify-center gap-4 text-xs flex-wrap">
                <span>🎯 Target: Baterai</span>
                <span>🚫 Dinding: Tidak bisa dilewati</span>
                <span>💧 Air: Tidak bisa dilewati</span>
                <span>🪨 Batu: Bisa didorong</span>
              </div>
            </div>
          </div>

          {/* Editor dan Kontrol */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border border-blue-500/20 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-yellow-400 flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  📝 Tulis Kode Go:
                </h3>
                <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                  Misi {currentLevel + 1}/10
                </span>
              </div>
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                placeholder={LEVELS[currentLevel].hint}
                className="w-full h-48 font-mono text-sm bg-gray-900 text-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none border border-blue-500/20"
                spellCheck="false"
              />

              <div className="mt-3 text-xs text-gray-400">
                <strong>Fungsi yang tersedia:</strong>{" "}
                {LEVELS[currentLevel].allowedFunctions.join(", ")}
              </div>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={runUserCode}
                disabled={
                  gameState === "running" || isAnimating || !userCode.trim()
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex-1 min-w-[140px] transition-all duration-300"
              >
                <Zap className="mr-2 h-4 w-4" />
                {gameState === "running" ? "Menjalankan..." : "Jalankan Misi"}
              </Button>

              <Button
                variant="outline"
                onClick={resetLevel}
                className="border-blue-500 text-blue-400 px-6 py-3"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>

            {/* Status Messages */}
            {gameState === "failed" && (
              <Card className="bg-red-900/30 border border-red-700 p-4 text-red-300 text-center animate-pulse">
                ❌ Misi Gagal! Robot kehabisan baterai atau terjebak.
                {timeLeft === 0 && " Waktu habis!"}
              </Card>
            )}

            {gameState === "success" && (
              <Card className="bg-green-900/30 border border-green-700 p-4 text-green-300 text-center animate-pulse">
                ✅ Misi Berhasil! Baterai terisi! Menuju level berikutnya...
              </Card>
            )}

            {/* Hint Box */}
            <Card className="bg-gray-800 border border-blue-500/20 p-4">
              <h4 className="font-semibold text-yellow-400 mb-2">
                💡 Petunjuk:
              </h4>
              <p className="text-sm text-gray-300 whitespace-pre-line">
                {LEVELS[currentLevel].hint}
              </p>
            </Card>

            {/* Progress */}
            <Card className="bg-gray-800 border border-blue-500/20 p-4">
              <div className="flex justify-between items-center text-sm">
                <span>Progress Game</span>
                <span>
                  {currentLevel + 1} / {LEVELS.length}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${((currentLevel + 1) / LEVELS.length) * 100}%`,
                  }}
                ></div>
              </div>
            </Card>
          </div>
        </div>

        {/* Victory Screen */}
        {currentLevel === LEVELS.length - 1 && gameState === "success" && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-1000">
            <Card className="w-full max-w-2xl p-8 bg-gray-800 border border-yellow-500 text-center relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>

              <Trophy className="h-24 w-24 mx-auto text-yellow-400 mb-6 animate-bounce" />

              <h2 className="text-4xl font-bold mb-4 text-yellow-400">
                Selamat! 🎉
              </h2>

              <p className="text-xl text-gray-300 mb-2">
                Kamu telah menyelesaikan semua misi!
              </p>
              <p className="text-gray-400 mb-6">
                Kamu sekarang adalah{" "}
                <strong className="text-yellow-400">
                  Master Programmer Robot Go
                </strong>
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <Card className="p-3 bg-gray-700 border border-green-500">
                  <div className="text-green-400 font-bold">10/10</div>
                  <div className="text-gray-400">Misi Diselesaikan</div>
                </Card>
                <Card className="p-3 bg-gray-700 border border-blue-500">
                  <div className="text-blue-400 font-bold">Expert</div>
                  <div className="text-gray-400">Level Keahlian</div>
                </Card>
              </div>

              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => {
                    setCurrentLevel(0);
                    setIsPlaying(false);
                  }}
                  className="bg-blue-600 text-white px-8 py-3"
                >
                  Main Lagi
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentLevel(0);
                    setGameState("idle");
                    setUserCode("");
                  }}
                  className="border-blue-500 text-blue-400 px-6 py-3"
                >
                  Ulang dari Awal
                </Button>
              </div>
            </Card>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RobotMissionGame;
