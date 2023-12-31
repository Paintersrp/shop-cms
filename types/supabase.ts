export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      billboards: {
        Row: {
          created_at: string
          id: number
          image_url: string
          label: string
          shop_slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          image_url: string
          label: string
          shop_slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          image_url?: string
          label?: string
          shop_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "billboards_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          }
        ]
      }
      billboards_images: {
        Row: {
          alt: string | null
          billboard_id: number
          caption: string | null
          created_at: string
          id: number
          image_id: string
          updated_at: string
        }
        Insert: {
          alt?: string | null
          billboard_id: number
          caption?: string | null
          created_at?: string
          id?: number
          image_id: string
          updated_at?: string
        }
        Update: {
          alt?: string | null
          billboard_id?: number
          caption?: string | null
          created_at?: string
          id?: number
          image_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "billboards_images_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "billboards_images_image_id_fkey"
            columns: ["image_id"]
            isOneToOne: false
            referencedRelation: "images"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          billboard_id: number
          created_at: string
          id: number
          name: string
          shop_slug: string
          updated_at: string
        }
        Insert: {
          billboard_id: number
          created_at?: string
          id?: number
          name: string
          shop_slug: string
          updated_at?: string
        }
        Update: {
          billboard_id?: number
          created_at?: string
          id?: number
          name?: string
          shop_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_billboard_id_fkey"
            columns: ["billboard_id"]
            isOneToOne: false
            referencedRelation: "billboards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          }
        ]
      }
      colors: {
        Row: {
          created_at: string
          id: number
          name: string
          shop_slug: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          shop_slug: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          shop_slug?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "colors_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          }
        ]
      }
      images: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          updated_at: string
          url: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          url: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          item: number
          order_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          item: number
          order_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          item?: number
          order_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_item_fkey"
            columns: ["item"]
            isOneToOne: false
            referencedRelation: "retail_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          address: string | null
          created_at: string
          id: number
          is_paid: boolean
          phone: string | null
          shop_slug: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: number
          is_paid?: boolean
          phone?: string | null
          shop_slug: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: number
          is_paid?: boolean
          phone?: string | null
          shop_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          }
        ]
      }
      products: {
        Row: {
          created_at: string
          id: number
          shop_slug: string
          type: Database["public"]["Enums"]["store_type"]
          type_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          shop_slug: string
          type: Database["public"]["Enums"]["store_type"]
          type_id: number
          updated_at: string
        }
        Update: {
          created_at?: string
          id?: number
          shop_slug?: string
          type?: Database["public"]["Enums"]["store_type"]
          type_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["role"]
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["role"]
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["role"]
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      retail_product: {
        Row: {
          category_id: number
          color_id: number
          created_at: string
          id: number
          images: string[] | null
          is_archived: boolean
          is_featured: boolean
          name: string
          price: number
          shop_slug: string
          size_id: number
          updated_at: string
        }
        Insert: {
          category_id: number
          color_id: number
          created_at?: string
          id?: number
          images?: string[] | null
          is_archived?: boolean
          is_featured?: boolean
          name: string
          price: number
          shop_slug: string
          size_id: number
          updated_at?: string
        }
        Update: {
          category_id?: number
          color_id?: number
          created_at?: string
          id?: number
          images?: string[] | null
          is_archived?: boolean
          is_featured?: boolean
          name?: string
          price?: number
          shop_slug?: string
          size_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retail_product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retail_product_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retail_product_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          },
          {
            foreignKeyName: "retail_product_size_id_fkey"
            columns: ["size_id"]
            isOneToOne: false
            referencedRelation: "sizes"
            referencedColumns: ["id"]
          }
        ]
      }
      shops: {
        Row: {
          created_at: string
          id: number
          name: string
          slug: string
          type: Database["public"]["Enums"]["store_type"]
          updated_at: string
          userId: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          slug: string
          type?: Database["public"]["Enums"]["store_type"]
          updated_at?: string
          userId: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          slug?: string
          type?: Database["public"]["Enums"]["store_type"]
          updated_at?: string
          userId?: string
        }
        Relationships: []
      }
      sizes: {
        Row: {
          created_at: string
          id: number
          name: string
          shop_slug: string
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          shop_slug: string
          updated_at?: string
          value: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          shop_slug?: string
          updated_at?: string
          value?: string
        }
        Relationships: [
          {
            foreignKeyName: "sizes_shop_slug_fkey"
            columns: ["shop_slug"]
            isOneToOne: false
            referencedRelation: "shops"
            referencedColumns: ["slug"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "user" | "admin" | "superadmin"
      store_type: "retail" | "nft" | "service" | "restaurant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
