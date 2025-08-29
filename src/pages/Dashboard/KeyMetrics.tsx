import React, { useState, useRef } from "react";
import {
  PlusIcon,
  XIcon,
  EditIcon,
  GripVerticalIcon,
  SaveIcon,
  XCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import MetricCard from "./MetricCard";
import { cn } from "../../lib/utils";

export interface MetricCardData {
  id: string;
  title: string;
  value: number;
  target: number;
  trend: "up" | "down" | "stable";
  change: number;
  unit: string;
  sparklineData?: number[];
}

interface MetricCardsManagerProps {
  initialCards?: MetricCardData[];
  onCardsChange?: (cards: MetricCardData[]) => void;
  className?: string;
}

const defaultCards: MetricCardData[] = [
  {
    id: "1",
    title: "Overall Equipment Effectiveness",
    value: 84.2,
    target: 85.0,
    trend: "down",
    change: -1.3,
    unit: "%",
    sparklineData: [82, 84, 83, 85, 84, 86, 84, 83, 85, 84],
  },
  {
    id: "2",
    title: "Productivity",
    value: 92.8,
    target: 90.0,
    trend: "up",
    change: 2.1,
    unit: "%",
    sparklineData: [89, 91, 90, 92, 93, 91, 92, 94, 93, 93],
  },
  {
    id: "3",
    title: "Daily Output",
    value: 15420,
    target: 16000,
    trend: "stable",
    change: 0.0,
    unit: " units",
    sparklineData: [
      14800, 15200, 15100, 15800, 15600, 15900, 15400, 15200, 15600, 15420,
    ],
  },
];

export default function MetricCardsManager({
  initialCards = defaultCards,
  onCardsChange,
  className,
}: MetricCardsManagerProps) {
  const [cards, setCards] = useState<MetricCardData[]>(initialCards);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [editingCard, setEditingCard] = useState<MetricCardData | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    value: 0,
    target: 0,
    trend: "stable" as "up" | "down" | "stable",
    change: 0,
    unit: "%",
  });

  const updateCards = (newCards: MetricCardData[]) => {
    setCards(newCards);
    onCardsChange?.(newCards);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newCards = [...cards];
    const draggedCard = newCards[draggedIndex];
    newCards.splice(draggedIndex, 1);
    newCards.splice(dropIndex, 0, draggedCard);

    updateCards(newCards);
    setDraggedIndex(null);
  };

  const handleAddCard = () => {
    const newCard: MetricCardData = {
      id: Date.now().toString(),
      title: formData.title,
      value: formData.value,
      target: formData.target,
      trend: formData.trend,
      change: formData.change,
      unit: formData.unit,
      sparklineData: Array.from(
        { length: 10 },
        () => Math.floor(Math.random() * 20) + formData.value - 10
      ),
    };

    updateCards([...cards, newCard]);
    setFormData({
      title: "",
      value: 0,
      target: 0,
      trend: "stable",
      change: 0,
      unit: "%",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditCard = () => {
    if (!editingCard) return;

    const updatedCards = cards.map((card) =>
      card.id === editingCard.id
        ? {
          ...card,
          title: formData.title,
          value: formData.value,
          target: formData.target,
          trend: formData.trend,
          change: formData.change,
          unit: formData.unit,
        }
        : card
    );

    updateCards(updatedCards);
    setEditingCard(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteCard = (id: string) => {
    updateCards(cards.filter((card) => card.id !== id));
  };

  const openEditDialog = (card: MetricCardData) => {
    setEditingCard(card);
    setFormData({
      title: card.title,
      value: card.value,
      target: card.target,
      trend: card.trend,
      change: card.change,
      unit: card.unit,
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      value: 0,
      target: 0,
      trend: "stable",
      change: 0,
      unit: "%",
    });
  };

  const checkScrollArrows = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    checkScrollArrows();
    const handleResize = () => checkScrollArrows();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cards]);

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700", className)}>
      <div className="p-4">
        {/* Header with Manage Button */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Key Metrics</h3>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="small"
                className="flex items-center gap-2"
                onClick={resetForm}
              >
                <EditIcon className="h-4 w-4" />
                Manage
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Metric Card</DialogTitle>
              </DialogHeader>
              <MetricCardForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleAddCard}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Metric Cards Row with Navigation */}
      <div className="relative pb-2">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-700 shadow-lg rounded-full p-2 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
        )}

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-2 px-8"
          onScroll={checkScrollArrows}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          {cards.map((card, index) => (
            <div
              key={card.id}
              className="relative group min-w-[280px] flex-shrink-0"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              {/* Drag Handle */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-gray-600 text-white p-1 rounded cursor-move">
                  <GripVerticalIcon className="h-3 w-3" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                <Button
                  variant="ghost"
                  size="small"
                  className="h-6 w-6 p-0 bg-white/90 hover:bg-white"
                  onClick={() => openEditDialog(card)}
                >
                  <EditIcon className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  className="h-6 w-6 p-0 bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  <XIcon className="h-3 w-3" />
                </Button>
              </div>

              <MetricCard
                title={card.title}
                value={card.value}
                target={card.target}
                trend={card.trend}
                change={card.change}
                unit={card.unit}
                sparklineData={card.sparklineData}
                className="cursor-move"
              />
            </div>
          ))}

          {/* Add Card Placeholder */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <div className="min-w-[280px] flex-shrink-0 border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
                <PlusIcon className="h-8 w-8 mb-2" />

                <span className="text-sm font-medium">Add Metric Card</span>
              </div>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Metric Card</DialogTitle>
          </DialogHeader>
          <MetricCardForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEditCard}
            onCancel={() => setIsEditDialogOpen(false)}
            isEditing
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface MetricCardFormProps {
  formData: {
    title: string;
    value: number;
    target: number;
    trend: "up" | "down" | "stable";
    change: number;
    unit: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    title: string;
    value: number;
    target: number;
    trend: "up" | "down" | "stable";
    change: number;
    unit: string;
  }>>;
  onSubmit: () => void;
  onCancel: () => void;
  isEditing?: boolean;
}

function MetricCardForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing = false,
}: MetricCardFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter metric title"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="value">Current Value</Label>
          <Input
            id="value"
            type="number"
            step="0.1"
            value={formData.value}
            onChange={(e) =>
              setFormData({
                ...formData,
                value: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="target">Target Value</Label>
          <Input
            id="target"
            type="number"
            step="0.1"
            value={formData.target}
            onChange={(e) =>
              setFormData({
                ...formData,
                target: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="trend">Trend</Label>
          <Select
            value={formData.trend}
            onValueChange={(value: "up" | "down" | "stable") =>
              setFormData({ ...formData, trend: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="up">Up</SelectItem>
              <SelectItem value="down">Down</SelectItem>
              <SelectItem value="stable">Stable</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="change">Change (%)</Label>
          <Input
            id="change"
            type="number"
            step="0.1"
            value={formData.change}
            onChange={(e) =>
              setFormData({
                ...formData,
                change: parseFloat(e.target.value) || 0,
              })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          value={formData.unit}
          onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
          placeholder="e.g., %, units, hrs"
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <XCircleIcon className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit">
          <SaveIcon className="h-4 w-4 mr-2" />
          {isEditing ? "Update" : "Add"} Metric
        </Button>
      </div>
    </form>
  );
}
