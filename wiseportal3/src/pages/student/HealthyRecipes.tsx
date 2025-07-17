import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  calories: number;
  servings: number;
}

interface CookingVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  recipeTitle: string;
}

const HealthyRecipes: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  const cookingVideos: CookingVideo[] = [
    {
      id: 'FBQgXRdRPII',
      title: 'Protein-Packed Berry Smoothie Bowl Recipe',
      thumbnail: `https://img.youtube.com/vi/FBQgXRdRPII/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=FBQgXRdRPII',
      recipeTitle: 'Berry Protein Smoothie Bowl'
    },
    {
      id: 'vrAZPPb1j6E',
      title: 'Mediterranean Grilled Chicken Salad Tutorial',
      thumbnail: `https://img.youtube.com/vi/vrAZPPb1j6E/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=vrAZPPb1j6E',
      recipeTitle: 'Mediterranean Grilled Chicken Salad'
    },
    {
      id: 'MPPAy7PR6Hw',
      title: 'Healthy Trail Mix - Perfect Snack Recipe',
      thumbnail: `https://img.youtube.com/vi/MPPAy7PR6Hw/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=MPPAy7PR6Hw',
      recipeTitle: 'Energy-Boosting Trail Mix'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Recipes' },
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' },
    { id: 'snacks', name: 'Healthy Snacks' },
    { id: 'smoothies', name: 'Smoothies' }
  ];

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Berry Protein Smoothie Bowl',
      description: 'Start your day with this antioxidant-rich smoothie bowl topped with fresh fruits and seeds.',
      prepTime: '10 mins',
      difficulty: 'Easy',
      category: 'breakfast',
      image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      calories: 320,
      servings: 1,
      ingredients: [
        '1 cup mixed berries (frozen)',
        '1 banana',
        '1 scoop vanilla protein powder',
        '1/2 cup almond milk',
        'Toppings: chia seeds, granola, fresh berries'
      ],
      instructions: [
        'Blend frozen berries, banana, protein powder, and almond milk until smooth',
        'Pour into a bowl',
        'Top with fresh berries, granola, and chia seeds',
        'Serve immediately'
      ],
    },
    {
      id: '2',
      title: 'Mediterranean Grilled Chicken Salad',
      description: 'A protein-packed salad with Greek-inspired flavors and a light lemon herb dressing.',
      prepTime: '25 mins',
      difficulty: 'Medium',
      category: 'dinner',
      image: 'https://images.unsplash.com/photo-1604497181015-76590d828b75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      calories: 450,
      servings: 2,
      ingredients: [
        '2 chicken breasts',
        '4 cups mixed greens',
        '1 cucumber, diced',
        'Cherry tomatoes',
        'Kalamata olives',
        'Feta cheese',
        'Olive oil and lemon dressing'
      ],
      instructions: [
        'Season chicken with herbs and grill until cooked through',
        'Chop vegetables and arrange on plates',
        'Slice grilled chicken',
        'Top salad with chicken, olives, and feta',
        'Drizzle with olive oil and lemon dressing'
      ],
    },
    {
      id: '3',
      title: 'Energy-Boosting Trail Mix',
      description: 'A healthy mix of nuts, seeds, and dried fruits for a perfect afternoon snack.',
      prepTime: '5 mins',
      difficulty: 'Easy',
      category: 'snacks',
      image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      calories: 180,
      servings: 4,
      ingredients: [
        '1 cup almonds',
        '1 cup walnuts',
        '1/2 cup pumpkin seeds',
        '1/2 cup dried cranberries',
        '1/4 cup dark chocolate chips'
      ],
      instructions: [
        'Mix all ingredients in a large bowl',
        'Store in an airtight container',
        'Portion into 1/4 cup servings when ready to eat'
      ],
    },
    {
      id: '4',
      title: 'Green Goddess Smoothie',
      description: 'A nutrient-dense green smoothie that tastes amazing and gives you lasting energy.',
      prepTime: '5 mins',
      difficulty: 'Easy',
      category: 'smoothies',
      image: 'https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      calories: 220,
      servings: 1,
      ingredients: [
        '2 cups spinach',
        '1 green apple',
        '1 banana',
        '1 inch ginger',
        '1 cup coconut water',
        '1 tbsp chia seeds'
      ],
      instructions: [
        'Add all ingredients to a blender',
        'Blend until smooth',
        'Add more coconut water if needed for desired consistency',
        'Serve immediately'
      ],
    }
  ];

  const filteredRecipes = selectedCategory === 'all' 
    ? recipes 
    : recipes.filter(recipe => recipe.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wise-blue-light)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Camila's Healthy Recipes</h1>
          <p className="text-xl text-gray-600 mb-2">Discover delicious and nutritious recipes for a healthier lifestyle</p>
        </div>

        {/* Cooking Videos Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cooking Demonstrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cookingVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => handleVideoClick(video.url)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                    <PlayCircleIcon className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Recipe: {video.recipeTitle}</p>
                  <button
                    onClick={() => handleVideoClick(video.url)}
                    className="mt-3 flex items-center text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] transition-colors"
                  >
                    <PlayCircleIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">Watch Video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[var(--wise-orange)] text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-[var(--wise-orange-light)] hover:text-[var(--wise-orange)]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div 
                className="relative cursor-pointer"
                onClick={() => {
                  setSelectedRecipe(recipe);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[var(--wise-orange)] text-white px-3 py-1 rounded-full text-sm">
                  {recipe.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{recipe.description}</p>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{recipe.prepTime}</span>
                    <span className="text-sm text-gray-500">{recipe.calories} cal</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-2xl bg-white rounded-2xl shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  {selectedRecipe?.title}
                </Dialog.Title>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              {selectedRecipe && (
                <div className="p-6 space-y-6">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-[var(--wise-orange)]">
                        {selectedRecipe.category}
                      </div>
                      <div className="text-sm text-gray-500">
                        Prep time: {selectedRecipe.prepTime}
                      </div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-sm text-gray-500">
                        {selectedRecipe.calories} calories
                      </div>
                      <div className="text-sm text-gray-500">
                        Serves {selectedRecipe.servings}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600">{selectedRecipe.description}</p>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Ingredients</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-600">{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">Instructions</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index} className="text-gray-600">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default HealthyRecipes; 