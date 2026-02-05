import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { useTodoStore } from "../../store/todoStore";
import { EmptyState } from "./EmptyState";
import { TodoItem } from "./TodoItem";

type FilterType = "all" | "active" | "completed";

export function TodoList() {
  const { todos } = useTodoStore();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const activeTodos = todos.filter((t) => !t.completed).length;
  const completedTodos = todos.filter((t) => t.completed).length;

  const FilterButton = ({
    type,
    label,
    count,
  }: {
    type: FilterType;
    label: string;
    count?: number;
  }) => (
    <Pressable
      onPress={() => setFilter(type)}
      className={`px-4 py-2 rounded-xl ${
        filter === type ? "bg-accent-purple" : "bg-dark-200"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          filter === type ? "text-white" : "text-gray-400"
        }`}
      >
        {label}
        {count !== undefined && count > 0 && (
          <Text className="text-xs"> ({count})</Text>
        )}
      </Text>
    </Pressable>
  );

  return (
    <View className="flex-1">
      {/* Filter Tabs */}
      <View className="flex-row gap-2 mb-4">
        <FilterButton type="all" label="All" count={todos.length} />
        <FilterButton type="active" label="Active" count={activeTodos} />
        <FilterButton type="completed" label="Done" count={completedTodos} />
      </View>

      {/* Todo List */}
      {filteredTodos.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={filteredTodos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoItem todo={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

